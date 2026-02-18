/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('order').del();
  await knex('order').insert([
    { order_id: 1, customer_id: 2, orderData: new Date(), total: 2 },
    { order_id: 2, customer_id: 1, orderData: new Date(), total: 3 },
    { order_id: 3, customer_id: 3, orderData: new Date(), total: 1 },
  ]);
};
