import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Images extends BaseSchema {
  protected tableName = 'images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('url').notNullable()
      table.string('name').nullable()
      table.string('description').nullable()
      table.integer('year').nullable()
      table.string('font').nullable()
      table.integer('user_id').references('id').inTable('users').notNullable()
      table.boolean('is_deleted').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
