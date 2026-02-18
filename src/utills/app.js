const express = require('express');
const app = express();
const knex = require('./knex');

// const { initUsers } = require('../users/index');

const buildServer = () => {
  app.use(express.json());
  // app.use(express.static(__dirname, 'public'));
  // const userController = initUsers(knex);

  app.get('/api', async (req, res) => {
    const foo = await knex('users').select('*');
    return res.send(foo);
  });

  return app;
};

module.exports = { buildServer };
