import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import Image from 'App/Models/Image'

export default class ImagesController {
  public async index ({ view }: HttpContextContract) {
    const images = await Image.query()
    return view.render('image/index', { images })
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('image/create')
  }

  public async store ({ request, response, auth, session }: HttpContextContract) {
    const user = auth.user
    const s3 = Drive.use('s3')    

    var file = request.file('image')
    var fileData = request.only(['name','description'])
    

    if(!file || !user) {
      return response.json({'error': 'error'})
    }

    const filePath = `${Date.now()}-${file?.clientName}`

    await file.move(Application.tmpPath('uploads'), {
      name: filePath,
      overwrite: true, // overwrite in case of conflict
    })
    
    await fs.readFile(`${Application.tmpPath('uploads')}/${filePath}`, async (error, data) => {
      if (error) {
        return response.json({'error':'error on file upload'})
      }else {
        await s3.put(filePath, data).then( async () => {
          const url = await s3.getUrl(filePath)
          await user.related('images').create({'name': fileData.name, 'description': fileData.description, 'url': url})
        })
      }
    })
    session.flash('errors', {"success": `Imagem cadastrada com sucesso`})
    session.flashAll()
    return response.redirect().toRoute('image.create')
  } 

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
