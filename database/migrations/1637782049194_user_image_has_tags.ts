import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserImageHasTags extends BaseSchema {
  protected tableName = 'user_image_has_tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('image_id').references('id').inTable('images').nullable()
      table.integer('post_id').references('id').inTable('posts').nullable()
      table.integer('tag_id').references('id').inTable('tags').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
