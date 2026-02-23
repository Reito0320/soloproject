/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('credit').del();
  await knex('credit').insert([
    {
      user_id: 1,
      credit_number: 23239848,
      credit_name: 'hoge',
      credit_expiry: 2340,
      credit_cvc: 213,
    },
    {
      user_id: 2,
      credit_number: 3423842093,
      credit_name: 'hoge',
      credit_expiry: 1334,
      credit_cvc: 242,
    },
    {
      user_id: 3,
      credit_number: 234253645547,
      credit_name: 'hoge',
      credit_expiry: 3243,
      credit_cvc: 455,
    },
  ]);
};
