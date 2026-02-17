/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del();
  await knex('products').insert([
    {
      products_id: 1,
      name: 'いいハサミ',
      description: 'test1 test test test testです',
      price: 4000,
      stock: 4,
    },
    {
      products_id: 2,
      name: 'そこそこいいハサミ',
      description: 'test2 test test test testです',
      price: 5000,
      stock: 5,
    },
    {
      products_id: 3,
      name: 'まあまあいいハサミ',
      description: 'test3 test test test testです',
      price: 10000,
      stock: 6,
    },
  ]);
};
