import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import PostHasImage from 'App/Models/PostHasImage'
import Drive from '@ioc:Adonis/Core/Drive'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Image from 'App/Models/Image'

export default class ImagesController {
  public async index({ view }: HttpContextContract) {
    //carregar todas as imagens e mandar para o front-end
    const images = await Image.query().where('isDeleted', false)

    return view.render('image/index', { images })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('image/create')
  }

  public async search({ view, request }: HttpContextContract) {

    // pesquisar imagem por nome (TODO: pesquisar por palavras relacionadas, categorias e mais)

    const data = request.only(['search'])
    const allImages = await Image.query().where('isDeleted', false)
    var images: Array<Image> = []

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

    //caregar o usuario logado e os dados do front-end
    const user = auth.user
    var file = request.file('image')
    var fileData = request.only(['name', 'font', 'city', 'neighborhood', 'street', 'year', 'date'])

    //verificar dados
    if (!file || !user) {
      session.flash('errors', { "success": `Erro ao enviar arquivo` })
      session.flashAll()
      return response.redirect().back()
    }

    if (!this.validateImage(fileData, session)) {
      return response.redirect().back()
    }

    //usar o serviço s3 da amazon (TODO: mudar para serviço local)
    // const s3 = Drive.use('s3')

    //criar um nome unico para o arquivo
    const filePath = `${Date.now()}-${file?.clientName}`

    //mandar o arquivo para a pasta uploads
    await file.moveToDisk('./', { name: filePath }).then(async () => {
      const img = await user.related('images').create({ 'name': fileData.name, 'path': filePath, 'font': fileData.font, 'year': fileData.year, 'city': fileData.city, 'neighborhood': fileData.neighborhood, 'street': fileData.street, 'date': fileData.date })
      //criar log de imagem criada
      await user.related('logs').create({ type: 'image', action: 'create', message: `${user.name} criou uma imagem`, 'imageId': img.id })
    })

    //carregar o arquivo 
    // await fs.readFile(`${Application.tmpPath('uploads')}/${filePath}`, async (error, data) => {
    //   if (error) {
    //     return response.json({ 'error': 'Erro no cadastro do arquivo' })
    //   } else {
    //     //mandar para o s3 da amazon
    //     await s3.put(filePath, data).then(async () => {
    //       const url = await s3.getUrl(filePath)
    //       const img = await user.related('images').create({ 'name': fileData.name, 'url': url, 'font': fileData.font, 'year': fileData.year })
    //       //criar log de imagem criada
    //       await user.related('logs').create({ type: 'image', action: 'create', message: `${user.name} criou uma imagem`, 'imageId': img.id })
    //     })
    //   }
    // })

    session.flash('errors', { "success": `Imagem enviada com sucesso` })
    session.flashAll()
    return response.redirect().back()
  }

  public async show({ view, params, response, session }: HttpContextContract) {

    //pegar imagem
    const image = await Image.query().where('id', params.id).firstOrFail()
    if (image.date) {
      image['data'] = format(Number(image.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    }

    //verificar se imagem não foi excluida
    if (image.isDeleted) {
      session.flash('errors', { "success": `Aceeso negado` })
      session.flashAll()
      return response.redirect().back()
    }

    //pegar os posts relacionados com a imagem, e formatar a data para mandar para o front-end
    const posts: Array<Post> = []

    const postHasImages = await PostHasImage.query().where('image_id', params.id)


    await postHasImages.forEach(async e => {
      var post = await Post.query().where('id', e.postId).firstOrFail()
      post['data'] = format(Number(post.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
      post['user'] = await User.query().where('id', post.userId).firstOrFail()
      posts.push(post)
    });

    var allPosts

    if (posts.length === 0) {
      allPosts = await Post.query().where('isDeleted', false).limit(3).orderBy('createdAt', 'desc')
      allPosts.forEach(async post => {
        post['data'] = format(Number(post.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
        post['user'] = await User.query().where('id', post.userId).firstOrFail()
      })
    }

    //pegar o usuario que cadastrou a imagem
    const user = await User.query().where('id', image.userId).firstOrFail()

    //aumentar a contagem de visualização da imagem e salvar
    image.views += 1

    await image.save()

    //carregar a página 
    return view.render('image/show', { image, posts, user, allPosts })
  }

  public async edit({ view, params, auth, response, session }: HttpContextContract) {
    const image = await Image.query().where('id', params.id).firstOrFail()
    const user = await auth.user

    if (user?.isAdmin || user?.id === image.userId) {
      return view.render('image/edit', { image })
    } else {
      session.flash('errors', { "success": `Acesso negado` })
      session.flashAll()
      return response.redirect().back()
    }
  }

  public async update({ request, params, response, session, auth }: HttpContextContract) {
    const data = request.only(['name', 'font', 'city', 'neighborhood', 'street', 'year', 'date'])
    const user = await auth.user
    const image = await Image.query().where('id', params.id).firstOrFail()

    if (user?.isAdmin || user?.id === image.userId) {
      if (!this.validateImage(data, session)) {
        return response.redirect().back()
      }

      image.name = data.name
      image.font = data.font
      image.year = data.year
      image.city = data.city
      image.neighborhood = data.neighborhood
      image.street = data.street
      image.date = data.date

      await image.save()

      await user.related('logs').create({ type: 'image', action: 'update', message: `${user.name} atualizou uma imagem`, imageId: image.id })
      session.flash('errors', { "success": `Documento atualizado` })
      session.flashAll()

      return response.redirect().toRoute('image.index')
    } else {
      session.flash('errors', { "success": `Acesso negado` })
      session.flashAll()
      return response.redirect().back()
    }

  }

  public async delete({ params, session, response, auth }: HttpContextContract) {
    const user = await auth.user

    if (user?.isAdmin || user?.id === params.id) {
      const image = await Image.query().where('id', params.id).firstOrFail()
      image.isDeleted = true
      await image.save()

      await user?.related('logs').create({ type: 'image', action: 'delete', message: `${user.name} excluiu uma imagem`, imageId: image.id })
      session.flash('errors', { "success": `Imagem excluida com sucesso` })
      session.flashAll()
      return response.redirect().toRoute('image.index')
    } else {
      session.flash('errors', { "success": `Aceeso negado` })
      session.flashAll()
      return response.redirect().back()
    }
  }

  private validateImage(data, session): Boolean {
    const errors = {}

    if (!data.name) {
      this.registerError(errors, 'name', 'Campo obrigatório')
    } else {
      if (data.name.length > 100) {
        this.registerError(errors, 'name', 'Nome muito longo')
      }
    }

    if (data.year) {
      if (data.year.length != 4 || data.year > new Date().getFullYear()) {
        this.registerError(errors, 'year', `Ano inválido, O ano tem que conter 4 digitos e ser menor que ${new Date().getFullYear() + 1}`)
      }
    }

    if (data.font) {
      if (data.font.length > 100) {
        this.registerError(errors, 'font', `Tamanho máximo de 100 caracteres`)
      }
    }

    if (data.date) {
      if (new Date(data.date).getTime() > new Date().getTime()) {
        this.registerError(errors, 'date', `Data inválida, a data não pode ser maior que a data atual`)
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
