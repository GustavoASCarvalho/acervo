import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'

export default class TagsController {
  public async index({}: HttpContextContract) {}

  public async create({ view }: HttpContextContract) {
    return view.render('tag/create')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = request.only(['name'])
    const user = await auth.user

    if (!user) {
      session.flash('errors', { success: `Acesso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    if (!this.validateName(data, session)) {
      return response.redirect().back()
    }

    await Tag.create({ tag: data.name, userId: user.id })

    session.flash('errors', { success: `Tag criada` })
    session.flashAll()

    return response.redirect().back()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  private validateName(data, session): Boolean {
    const errors = {}

    if (!data.name) {
      this.registerError(errors, 'title', 'Campo obrigatório')
    }

    if (Object.entries(errors).length > 0) {
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
