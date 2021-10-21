import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ view }: HttpContextContract) {
    return view.render('post/create')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const user = auth.user
    const data = request.only(['text', 'title'])
    console.log(data);

    if (!this.validateCreatePost(data, session)) {
      return response.redirect().back()
    }
    await Post.create({ 'imageId': 1, 'userId': user?.id, 'title': data.title, 'description': data.text })
    response.redirect().back()
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
