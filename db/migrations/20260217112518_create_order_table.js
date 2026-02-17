/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order', (table) => {
    table.increments('order_id').primary();
    table.integer('customer_id');
    table.timestamp('orderData');
    table.integer('total');
    table.foreign('customer_id').references('user_id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('order');
};
