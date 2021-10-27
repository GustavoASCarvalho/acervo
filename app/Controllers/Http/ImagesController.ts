import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import Image from 'App/Models/Image'

export default class ImagesController {
  public async index({ view }: HttpContextContract) {
    const images = await Image.query()
    return view.render('image/index', { images })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('image/create')
  }

  public async search({ view, request }: HttpContextContract) {
    const data = request.only(['search'])
    const allImages = await Image.query()
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
          await user.related('images').create({ 'name': fileData.name, 'url': url, 'font': fileData.font, 'year': fileData.year })
        })
      }
    })
    session.flash('errors', { "success": `Imagem cadastrada com sucesso` })
    session.flashAll()
    return response.redirect().toRoute('image.create')
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
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
