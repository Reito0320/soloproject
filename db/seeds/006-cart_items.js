/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cart_items').del();
  await knex('cart_items').insert([
    { cart_id: 1, product_id: 3, count: 5 },
    { cart_id: 2, product_id: 1, count: 10 },
    { cart_id: 3, product_id: 2, count: 15 },
  ]);
};
