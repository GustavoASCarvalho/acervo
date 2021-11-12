import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Logs extends BaseSchema {
  protected tableName = 'logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('id').inTable('users').notNullable()
      table.integer('image_id').references('id').inTable('images').nullable()
      table.integer('post_id').references('id').inTable('posts').nullable()
      table.string('action').notNullable()
      table.string('type').notNullable()
      table.string('message').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
