const { createRepository } = require('./create_users_repository');
const { createService } = require('./create_users_service');
const { createController } = require('./create_users_controller');

const initUsers = (knex) => {
  const repository = createRepository(knex);
  const service = createService(repository);
  const controller = createController(service);
  return controller;
};

module.exports = { initUsers };
