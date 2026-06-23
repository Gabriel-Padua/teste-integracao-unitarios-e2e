// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      connection: process.env.DATABASE_URL,
      database: 'test',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
