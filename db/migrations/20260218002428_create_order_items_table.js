/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('orderItem_id').primary();
    table.integer('order_id');
    table.integer('product_id');
    table.integer('count');
    table.integer('price');
    table.foreign('order_id').references('order_id').inTable('order');
    // table.foreign('product_id').references('product_id').inTable('products');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('order_items');
};
