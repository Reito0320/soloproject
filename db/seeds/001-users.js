/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { id: 1, name: '近藤昌幸', email: 'utautai@yahoo.com.jp' },
    { id: 2, name: '田中正八', email: 'tekitou@yahoo.com.jp' },
    {
      id: 3,
      name: 'マツコデラックス',
      email: 'getuyoukarayofukashi@yahoo.com.jp',
    },
  ]);
};
