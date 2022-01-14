import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default class LogsController {
    public async index({ view }: HttpContextContract) {

        const logs = await Log.query().orderBy('created_at', 'desc')

        logs.forEach(log => {
            log['data'] = format(Number(log.createdAt), "dd 'de' MMMM', às ' HH:mm'h'", { locale: ptBR })
        })

        return view.render('logs/index', { logs })
    }

    public async create({ }: HttpContextContract) {
    }

    public async store({ }: HttpContextContract) {
    }

    public async show({ }: HttpContextContract) {
    }

    public async edit({ }: HttpContextContract) {
    }

    public async update({ }: HttpContextContract) {
    }

    public async destroy({ }: HttpContextContract) {
    }
}
