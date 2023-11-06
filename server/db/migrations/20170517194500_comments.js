export async function up(knex) {
  await knex.schema.createTable('Comments', (table) => {
    table.increments().primary()
    table.integer('post_id').references('Posts.id').onDelete('cascade')
    table.date('date_posted')
    table.string('comment')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('Comments')
}
