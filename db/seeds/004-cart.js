/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cart').del();
  await knex('cart').insert([
    { cart_id: 1, customer_id: 3 },
    { cart_id: 2, customer_id: 2 },
    { cart_id: 3, customer_id: 1 },
  ]);
};
