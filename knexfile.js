// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: "knex_test",
      user: "postgres",
      password: "vik@123456"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  }

};