
exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id')
    table.text('username').unique().notNullable()

    table.timestamp('create_at').defaultTo(knex.fn.now())  // esta operacao irá adicionar uma data quando for feita a acao de inserir um dado na tabela.
    table.timestamp('updated_at').defaultTo(knex.fn.now()) // esta operacao irá adicionar uma data quando for feita a acao de atualizar um dado na tabela.
})

exports.down = knex => knex.schema.dropTable('users')
