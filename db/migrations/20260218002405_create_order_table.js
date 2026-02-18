/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order', (table) => {
    table.increments('order_id').primary();
    table.integer('user_id');
    table.timestamp('orderData');
    table.integer('total');
    table.foreign('user_id').references('user_id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('order');
};
