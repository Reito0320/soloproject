/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('table_name').del();
  await knex('table_name').insert([
    { order_id: 1, customer_id: 2, orderData: Date.now(), total: 2 },
    { order_id: 2, customer_id: 1, orderData: Date.now(), total: 3 },
    { order_id: 3, customer_id: 3, orderData: Date.now(), total: 1 },
  ]);
};
