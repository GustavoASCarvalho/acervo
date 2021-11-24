import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserImageHasTag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public image_id?: number

  @column()
  public post_id?: number

  @column()
  public tag_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
