exports.up = function(knex) {
  return knex.schema.createTable('casos', function(table) {
    table.increments()
    table.string('titulo').notNullable()
    table.string('descricao').notNullable()
    table.decimal('value').notNullable()
    table.string('ong_id').notNullable()

    table
      .foreign('ong_id')
      .references('id')
      .inTable('ongs')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('casos')
};
