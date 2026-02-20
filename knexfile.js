// Update with your config settings.
require('dotenv').config(__dirname + '.env');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    /* DBの種類 */
    client: 'pg',
    /* DB接続情報 */
    connection: {
      host: process.env.EC_HOST || 'localhost',
      port: process.env.EC_PORT || 5432,
      database: process.env.EC_NAME,
      user: process.env.EC_USER,
      password: process.env.EC_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.EC_HOST || 'localhost',
      port: process.env.EC_PORT || 5432,
      database: process.env.EC_NAME,
      user: process.env.EC_USER,
      password: process.env.EC_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
