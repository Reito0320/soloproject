/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del();
  await knex('products').insert([
    {
      name: 'number004',
      price: 21000,
      stock: 100,
      path: '004',
    },
    {
      name: 'number005',
      price: 35000,
      stock: 100,
      path: '005',
    },
    {
      name: 'number008',
      price: 5000,
      stock: 100,
      path: '008',
    },
    {
      name: 'number009',
      price: 2000,
      stock: 100,
      path: '009',
    },
    {
      name: 'number002',
      price: 30000,
      stock: 100,
      path: '002',
    },
    {
      name: 'number003',
      price: 12000,
      stock: 100,
      path: '003',
    },
  ]);
};
