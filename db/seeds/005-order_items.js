/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('order_items').del();
  await knex('order_items').insert([
    { orderItem_id: 1, order_id: 2, product_id: 1, count: 2, price: 4000 },
    { orderItem_id: 2, order_id: 1, product_id: 2, count: 3, price: 4000 },
    { orderItem_id: 3, order_id: 3, product_id: 3, count: 1, price: 4000 },
  ]);
};
