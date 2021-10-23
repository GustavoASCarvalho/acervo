import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image';
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ view, params }: HttpContextContract) {
    const image = await Image.query().where({ id: params.id }).firstOrFail()
    return view.render('post/create', { image })
  }

  public async store({ request, response, auth, session, params }: HttpContextContract) {
    const user = auth.user
    const data = request.only(['text', 'title'])

    if (!this.validateCreatePost(data, session)) {
      return response.redirect().back()
    }
    await Post.create({ 'imageId': params.id, 'userId': user?.id, 'title': data.title, 'description': data.text })
    session.flash('errors', { "success": "Postagem concluida" })
    session.flashAll()
    response.redirect().toRoute('/')
  }

  private validateCreatePost(data, session): Boolean {
    const errors = {}

    if (!data.title) {
      this.registerError(errors, 'title', 'Campo obrigatório')
    }

    if (!data.text) {
      this.registerError(errors, 'text', 'Campo obrigatório')
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
