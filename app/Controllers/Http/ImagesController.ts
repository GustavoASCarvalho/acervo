import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import Image from 'App/Models/Image'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default class ImagesController {
  public async index({ view }: HttpContextContract) {
    const images = await Image.query().where('isDeleted', false)
    return view.render('image/index', { images })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('image/create')
  }

  public async search({ view, request }: HttpContextContract) {
    const data = request.only(['search'])
    const allImages = await Image.query().where('isDeleted', false)
    var images: any[] = []

    if (!data.search) {
      images = allImages
    } else {
      allImages.forEach(image => {
        if (image.name?.toLocaleLowerCase().includes(data.search.toLocaleLowerCase())) {
          images.push(image)
        }
      })
    }

    return view.render('image/index', { images })
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const user = auth.user
    const s3 = Drive.use('s3')

    var file = request.file('image')
    var fileData = request.only(['name', 'font', 'year'])

    console.log(fileData.year);


    if (!file || !user) {
      session.flash('errors', { "success": `Erro ao enviar arquivo` })
      session.flashAll()
      return response.redirect().back()
    }
    if (!this.validateImage(fileData, session)) {
      return response.redirect().back()
    }

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
          const url = await s3.getUrl(filePath)
          const img = await user.related('images').create({ 'name': fileData.name, 'url': url, 'font': fileData.font, 'year': fileData.year })
          await user.related('logs').create({ type: 'image', action: 'create', message: `${user.name} criou uma imagem`, 'imageId': img.id })
        })
      }
    })

    session.flash('errors', { "success": `Imagem cadastrada com sucesso` })
    session.flashAll()
    return response.redirect().toRoute('image.create')
  }

  public async show({ view, params, response, session }: HttpContextContract) {
    const image = await Image.query().where('id', params.id).firstOrFail()

    if (image.isDeleted) {
      session.flash('errors', { "success": `Aceeso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    const imagePosts = await Post.query().where('image_id', params.id).where('is_deleted', false).orderBy('created_at', 'desc').limit(5)
    const posts = await Post.query().orderBy('created_at', 'desc').where('is_deleted', false).limit(5)
    const user = await User.query().where('id', image.userId).firstOrFail()

    posts.forEach(post => {
      post['data'] = format(Number(post.createdAt), "dd 'de' MMMM', às ' HH:mm'h'", { locale: ptBR })
    })

    image.views += 1

    await image.save()

    return view.render('image/show', { image, posts, imagePosts, user })
  }

  public async edit({ view, params, auth, response, session }: HttpContextContract) {
    const image = await Image.query().where('id', params.id).firstOrFail()
    const user = await auth.user

    if (user?.isAdmin || user?.id === image.userId) {
      return view.render('image/edit', { image })
    } else {
      session.flash('errors', { "success": `Aceeso negado` })
      session.flashAll()
      return response.redirect().back()
    }
  }

  public async update({ request, params, response, session, auth }: HttpContextContract) {
    const data = request.only(['name', 'font', 'year'])
    const user = await auth.user
    const image = await Image.query().where('id', params.id).firstOrFail()

    if (!user?.isAdmin && user?.id !== image.userId) {
      session.flash('errors', { "success": `Aceeso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    if (!this.validateImage(data, session)) {
      return response.redirect().back()
    }

    image.name = data.name
    image.font = data.font
    image.year = data.year

    await image.save()

    await user.related('logs').create({ type: 'image', action: 'update', message: `${user.name} atualizou uma imagem`, imageId: image.id })
    session.flash('errors', { "success": `Documento atualizado` })
    session.flashAll()

    return response.redirect().toRoute('image.index')
  }

  public async delete({ params, session, response, auth }: HttpContextContract) {
    const user = await auth.user

    if (!user?.isAdmin || user?.id !== params.id) {
      session.flash('errors', { "success": `Aceeso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    const image = await Image.query().where('id', params.id).firstOrFail()
    image.isDeleted = true
    await image.save()

    await user.related('logs').create({ type: 'image', action: 'delete', message: `${user.name} excluiu uma imagem`, imageId: image.id })
    session.flash('errors', { "success": `Imagem excluida com sucesso` })
    session.flashAll()
    return response.redirect().toRoute('image.index')
  }

  private validateImage(data, session): Boolean {
    const errors = {}

    if (!data.name) {
      this.registerError(errors, 'name', 'Campo obrigatório')
    }
    if (data.year) {
      if (data.year.length != 4 || data.year > new Date().getFullYear()) {
        this.registerError(errors, 'year', `Ano inválido, O ano tem que conter 4 digitos e ser menor que ${new Date().getFullYear() + 1}`)
      }
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
