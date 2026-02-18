const { table } = require('../../src/utills/knex');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('cart_items', (table) => {
    table.increments('cart_items_id').primary();
    table.integer('cart_id');
    table.integer('product_id');
    table.integer('count');
    table.foreign('cart_id').references('cart_id').inTable('cart');
    table.foreign('product_id').references('products_id').inTable('products');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('cart_items');
};
