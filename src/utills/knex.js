const status = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = require('../../knexfile.js')[status];

const knex = require('knex')(config);
console.log(config);

module.exports = knex;
