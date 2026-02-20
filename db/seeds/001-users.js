/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  console.log('***SEEDLOG', process.env.NODE_ENV);
  await knex('cart_items').del();
  await knex('cart').del();
  await knex('order_items').del();
  await knex('order').del();
  await knex('users').del();
  await knex('users').insert([
    { name: '近藤昌幸', email: 'utautai@yahoo.com.jp' },
    { name: '田中正八', email: 'tekitou@yahoo.com.jp' },
    {
      name: 'マツコデラックス',
      email: 'getuyoukarayofukashi@yahoo.com.jp',
    },
  ]);
};
