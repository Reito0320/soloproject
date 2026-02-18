/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del();
  await knex('products').insert([
    {
      name: 'いいハサミ',
      price: 4000,
      stock: 4,
    },
    {
      name: 'そこそこいいハサミ',
      price: 5000,
      stock: 5,
    },
    {
      name: 'まあまあいいハサミ',
      price: 10000,
      stock: 6,
    },
  ]);
};
