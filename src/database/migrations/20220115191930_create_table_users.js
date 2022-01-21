const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async knex => knex.schema.createTable('users', table => {
    table.increments('id')
    table.text('username').unique().notNullable()

    table.timestamp('create_at').defaultTo(knex.fn.now())  // esta operacao irá adicionar uma data quando for feita a acao de inserir um dado na tabela.
    table.timestamp('updated_at').defaultTo(knex.fn.now()) // esta operacao irá adicionar uma data quando for feita a acao de atualizar um dado na tabela.
}).then(() => knex.raw(onUpdateTrigger('users')))

exports.down = async knex => knex.schema.dropTable('users')
