import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Images extends BaseSchema {
  protected tableName = 'images'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('url').notNullable()
      table.string('name').nullable()
      table.timestamp('date').nullable()
      table.integer('year').nullable()
      table.string('font').nullable()
      table.integer('views').nullable().defaultTo(0)
      table.string('city').nullable()
      table.string('neighborhood').nullable()
      table.string('street').nullable()
      table.string('latitude').nullable()
      table.string('longitude').nullable()
      table.integer('user_id').references('id').inTable('users').notNullable()
      table.boolean('is_deleted').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
