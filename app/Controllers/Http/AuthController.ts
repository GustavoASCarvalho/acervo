import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class AuthController {

  public async list({ view, auth }: HttpContextContract) {
    const user = await auth.user

    if (!user || user.isAdmin == false) {
      return 'error'
    }

    const users = await User.query().whereNot('id', user.id)
    return view.render('auth/list', { users })
  }

  public async register({ view, auth }: HttpContextContract) {
    const user = await auth.user

    if (user) {
      return 'error'
    }

    return view.render('auth/register')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {

    const user = await auth.user

    if (user) {
      return 'error'
    }

    const data = request.only(['name', 'email', 'password', 'password2'])
    const users = await User.query()

    if (!this.validateStore(data, session, users)) {
      return response.redirect().back()
    }

    try {
      const user = await User.create({ name: data.name, email: data.email, password: data.password, profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' })
      await auth.login(user, true)
    } catch (error) {
      session.flash('errors', { "headRegister": "Impossivel criar usuario", "register": "display-block" })
      session.flashAll()
      return response.redirect().back()
    }
    await auth.user?.related('logs').create({ type: 'usuario', message: `o usuario ${auth.user?.name} foi criado`, action: 'create' })
    session.flash('errors', { "success": "Conta criada com sucesso" })
    session.flashAll()
    return response.redirect().toRoute('/')
  }

  public async login({ view, auth }: HttpContextContract) {
    const user = await auth.user

    if (user) {
      return 'error'
    }
    return view.render('auth/login')
  }

  public async verify({ request, response, session, auth }: HttpContextContract) {
    const data = request.only(['email', 'password', 'remember'])

    if (!this.validateVerify(data, session)) {
      return response.redirect().back()
    }

    try {
      await auth.attempt(data.email, data.password)
      if (auth.user?.isDeleted) {
        session.flash('errors', { "headLogin": "Usuario e/ou senha invalidos", "login": "display-block" })
        session.flashAll()
        await auth.logout()
        return response.redirect().back()
      }
    } catch (error) {
      session.flash('errors', { "headLogin": "Usuario e/ou senha invalidos", "login": "display-block" })
      session.flashAll()
      return response.redirect().back()
    }
    const user = await auth.user
    await user?.related('logs').create({ type: 'usuario', message: `${user.name} logou`, action: 'login' })
    session.flash('errors', { "success": `Bem-vindo, ${user?.name}!` })
    session.flashAll()
    return response.redirect().toRoute('/')
  }

  public async logout({ response, auth, session }: HttpContextContract) {
    await auth.user?.related('logs').create({ type: 'usuario', message: `${auth.user?.name} saiu`, action: 'logout' })
    await auth.logout()
    session.flash('errors', { "success": `Usuario desconectado` })
    session.flashAll()
    response.redirect().toRoute('/')
  }

  public async edit({ params, view, auth }: HttpContextContract) {

    if (!auth.user) {
      return 'error'
    }

    const user = await User.query().where('id', params.id).firstOrFail()
    return view.render('auth/edit', { user })
  }

  public async update({ request, params, session, response, auth }: HttpContextContract) {

    if (!auth.user) {
      return 'error'
    }

    const data = request.only(['name', 'email', 'admin', 'moderator', 'deleted'])

    const user = await User.query().where('id', params.id).firstOrFail()

    user.name = data.name
    user.email = data.email
    user.isAdmin = data.admin || false
    user.isModerator = data.moderator || false
    user.isDeleted = data.deleted || false
    var file = request.file('img')

    if (file) {

      const s3 = Drive.use('s3')
      const filePath = `${Date.now()}-${file?.clientName}`

      await file.move(Application.tmpPath('uploads'), {
        name: filePath,
        overwrite: true, // overwrite in case of conflict
      })

      await fs.readFile(`${Application.tmpPath('uploads')}/${filePath}`, async (error, data) => {
        if (error) {
          return response.json({ 'error': 'error on file upload' })
        } else {
          await s3.put(filePath, data).then(async () => {
            user.profileImg = await s3.getUrl(filePath)
            await user.save()
          })
        }
      })
    } else {
      await user.save()
    }

    await auth.user?.related('logs').create({ type: 'usuario', message: `o usuario ${auth.user?.name} editou o usuario ${user.name}`, action: 'update' })
    session.flash('errors', { "success": `Usuario atualizado` })
    session.flashAll()

    return response.redirect().toRoute('auth.list')
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