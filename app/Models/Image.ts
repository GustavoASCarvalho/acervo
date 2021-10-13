import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public name?: string

  @column()
  public description?: string

  @column()
  public font?: string

  @column()
  public year?: number

  @column()
  public userId: number

  @column()
  public isDeleted?: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

// table.increments('id')
//       table.string('url').notNullable()
//       table.string('name').notNullable()
//       table.string('description').notNullable()
//       table.string('font').notNullable()
//       table.integer('user_id').references('id').inTable('users').notNullable()
//       table.boolean('is_deleted').defaultTo(false)
//       table.timestamp('created_at', { useTz: true })
//       table.timestamp('updated_at', { useTz: true })