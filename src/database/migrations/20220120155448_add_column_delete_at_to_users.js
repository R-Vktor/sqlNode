exports.up = knex => knex.schema.alterTable('users', table => {
    table.timestamp('deleted_at') // esta operacao irá adicionar uma data quando for feita a acao de atualizar um dado na tabela.
})

exports.down = knex => knex.schema.alterTable('users', table => {
    table.dropColumns('deleted_at') // esta operacao irá adicionar uma data quando for feita a acao de atualizar um dado na tabela.
})
