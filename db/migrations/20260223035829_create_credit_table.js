const { table } = require('../../src/knex');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('credit', (table) => {
    table.increments('credit_id').primary();
    table.integer('user_id');
    table.bigInteger('credit_number');
    table.text('credit_name');
    table.integer('credit_expiry');
    table.integer('credit_cvc');
    table.foreign('user_id').references('user_id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('credit');
};
