import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image';
import Post from 'App/Models/Post';
import PostHasImage from 'App/Models/PostHasImage';
import User from 'App/Models/User';

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default class PostsController {

  public async create({ view, auth, session, response }: HttpContextContract) {

    const user = await auth.user

    if (!user) {
      session.flash('errors', { "success": `Acesso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    const images = await Image.query()

    return view.render('post/create', { images })
  }

  public async show({ view, params }: HttpContextContract) {
    const post = await Post.query().where('id', params.id).firstOrFail()
    const postHasImage = await PostHasImage.query().where('postId', params.id)

    var images: Array<Image> = []

    for (let i = 0; i < postHasImage.length; i++) {
      const image = await Image.query().where('id', postHasImage[i].imageId).firstOrFail()
      image['indice'] = i
      images.push(image)

    }

    return view.render('post/show', { post, images })
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      session.flash('errors', { "success": `Acesso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    const data = request.only(['title', 'text', 'images', 'description'])

    if (!this.validateCreatePost(data, session)) {
      return response.redirect().back()
    }

    var imagesId = data.images.split(',')

    const post = await Post.create({ 'userId': user?.id, 'title': data.title, 'description': data.description, 'text': data.text })

    await imagesId.forEach(async (id) => {
      await PostHasImage.create({
        postId: post.id,
        imageId: id
      })
    })

    await user?.related('logs').create({ type: 'post', action: 'create', message: `${user.name} criou um novo post`, postId: post.id })

    session.flash('errors', { "success": "Postagem concluida" })
    session.flashAll()
    response.redirect().toRoute('/')
  }

  public async list({ view, auth, session, response }: HttpContextContract) {
    const user = await auth.user
    const users = await User.query()

    var posts

    if (!user) {
      session.flash('errors', { "success": `Acesso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    if (user.isAdmin) {
      posts = await Post.query().orderBy('created_at', 'desc').where('isDeleted', false)
    } else if (user.isModerator) {
      posts = await Post.query().where('userId', user.id).orderBy('created_at', 'desc').where('isDeleted', false)
    }

    posts.forEach(post => {
      post['data'] = format(Number(post.createdAt), "dd 'de' MMMM', às ' HH:mm'h'", { locale: ptBR })
      posts.forEach((post) => {
        users.forEach((user) => {
          if (post.userId == user.id) {
            post['author'] = user.name
          }
        })
      })
    })

    return view.render('post/list', { posts })
  }

  public async update({ request, params, session, response, auth }: HttpContextContract) {
    const data = request.only(['title', 'description', 'text'])

    const post = await Post.query().where('id', params.id).firstOrFail()

    post.title = data.title
    post.description = data.description
    post.text = data.text

    await post.save()

    const user = await auth.user

    await user?.related('logs').create({ type: 'post', action: 'update', message: `${user.name} atualizou um post`, postId: post.id })
    session.flash('errors', { "success": `Post atualizado` })
    session.flashAll()

    return response.redirect().toRoute('post.list')
  }

  public async edit({ params, view }: HttpContextContract) {
    const post = await Post.query().where('id', params.id).firstOrFail()
    return view.render('post/edit', { post })
  }

  public async delete({ params, session, response, auth }: HttpContextContract) {
    const post = await Post.query().where('id', params.id).firstOrFail()

    const user = await auth.user

    if (!user) {
      session.flash('errors', { "success": `Acesso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    if (user.isAdmin) {
      post.isDeleted = true
      await post.save()
    } else if (user.isModerator) {
      if (post.userId == user.id) {
        post.isDeleted = true
        await post.save()
      } else {
        session.flash('errors', { "success": `Acesso negado` })
        session.flashAll()
        return response.redirect().back()
      }
    }

    await user?.related('logs').create({ type: 'post', action: 'delete', message: `${user.name} deletou um post`, postId: post.id })
    session.flash('errors', { "success": `Post deletado` })
    session.flashAll()

    return response.redirect().toRoute('post.list')
  }

  private validateCreatePost(data, session): Boolean {
    const errors = {}

    if (!data.title) {
      this.registerError(errors, 'title', 'Campo obrigatório')
    }

    if (!data.text) {
      this.registerError(errors, 'text', 'Campo obrigatório')
    }

    if (!data.images) {
      this.registerError(errors, 'images', 'Campo obrigatório, selecione ao menos uma imagem')
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
