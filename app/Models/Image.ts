import { DateTime } from 'luxon'
import { BaseModel, column, } from '@ioc:Adonis/Lucid/Orm'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public name?: string

  @column()
  public font?: string

  @column()
  public year?: number

  @column()
  public views: number

  @column()
  public address?: string

  @column()
  public coordinates?: string

  @column()
  public userId: number

  @column()
  public isDeleted?: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
