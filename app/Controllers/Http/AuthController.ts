import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

  public async list({ view, auth }: HttpContextContract) {
    const user = await auth.user

    if (!user || user.isAdmin == false) {
      return 'error'
    }

    const users = await User.query().whereNot('id', user.id)
    return view.render('auth/list', { users })
  }

  public async register({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password', 'password2'])
    const users = await User.query()

    if (!this.validateStore(data, session, users)) {
      return response.redirect().back()
    }

    try {
      const user = await User.create({ name: data.name, email: data.email, password: data.password})
      await auth.login(user, true)
    } catch (error) {
      session.flash('errors', {"head": "impossivel criar usuario", "register": "display-block"})
      session.flashAll()
      return response.redirect().back()
    }
    return response.redirect().toRoute('/')
  }

  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async verify({ request, response, session, auth }: HttpContextContract) {
    const data = request.only(['email', 'password', 'remember'])

    if (!this.validateVerify(data, session)) {
      return response.redirect().back()
    }

    try {
      await auth.attempt(data.email, data.password)  
    } catch (error) {
      session.flash('errors', {"head": "usuario e/ou senha invalidos", "login": "display-block"})
      session.flashAll()
      return response.redirect().back()  
    }
    return response.redirect().toRoute('/')
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    response.redirect().toRoute('/')
  }

  private validateStore(data, session, users): Boolean {
    const errors = {}

    if (!data.name) {
      this.registerError(errors, 'name', 'Campo obrigatório')
    } else if (data.name.length < 3) {
      this.registerError(errors, 'name', 'Nome precisa ter pelo menos 3 caracteres')
    } else if (data.name.length > 40) {
      this.registerError(errors, 'name', 'Nome precisa ter no máximo 40 caracteres')
    }

    if (!data.email) {
      this.registerError(errors, 'email', 'Campo obrigatório')
    } else {
      for (const u of users) {
        if (u.email === data.email) {
          this.registerError(errors, 'email', 'Email já cadastrado')
        }
      }
    }

    if (!data.password) {
      this.registerError(errors, 'password', 'Campo obrigatório')
    } else if (data.password.length < 3) {
      this.registerError(errors, 'password', 'Senha precisa ter pelo menos 3 caracteres')
    } else if (data.password.length > 16) {
      this.registerError(errors, 'password', 'Senha precisa ter no máximo 16 caracteres')
    }

    if (!data.password2) {
      this.registerError(errors, 'password2', 'Campo obrigatório')
    } else if (data.password2 != data.password) {
      this.registerError(errors, 'password2', 'As senhas não conferem')
    } 

    if (Object.entries(errors).length > 0) {
      this.registerError(errors, 'register', 'display-block')
      session.flash('errors', errors)
      session.flashAll()
      return false
    }
    return true
  }

  private validateVerify(data, session): Boolean {
    const errors = {}

    if (!data.email) {
      this.registerError(errors, 'email', 'Campo obrigatório')
    }

    if (!data.password) {
      this.registerError(errors, 'password', 'Campo obrigatório')
    }

    if (Object.entries(errors).length > 0) {
      this.registerError(errors, 'login', 'display-block')
      session.flash('errors', errors)
      session.flashAll()

      return false
    }

    return true
  }

  private registerError(errors, atribute, error) {
    if (!errors[atribute]) {
      errors[atribute] = []
    }
    errors[atribute].push(error)
  }
}