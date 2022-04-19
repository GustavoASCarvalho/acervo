import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// import Post from './Post'
// import PostHasImage from './PostHasImage'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  //@column()
  //public path: string

  @column()
  public name?: string

  @column()
  public font?: string

  @column()
  public date?: DateTime

  @column()
  public year?: number

  @column()
  public views: number

  @column()
  public city?: string

  @column()
  public neighborhood?: string

  @column()
  public street?: string

  @column()
  public latitude?: string

  @column()
  public longitude?: string

  @column()
  public userId: number

  @column()
  public isDeleted?: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @hasManyThrough([Post, PostHasImage])
  // public posts: HasManyThrough<typeof Post>
}
