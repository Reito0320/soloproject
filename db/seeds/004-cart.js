/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cart').del();
  await knex('cart').insert([{ user_id: 3 }, { user_id: 2 }, { user_id: 1 }]);
};
