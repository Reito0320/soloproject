/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('order').del();
  await knex('order').insert([
    { user_id: 2, orderDate: new Date(), total: 2 },
    { user_id: 1, orderDate: new Date(), total: 3 },
    { user_id: 3, orderDate: new Date(), total: 1 },
  ]);
};
