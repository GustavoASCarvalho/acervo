import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostHasImages extends BaseSchema {
  protected tableName = 'post_has_images'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('post_id').references('id').inTable('posts')
      table.integer('image_id').references('id').inTable('images')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
