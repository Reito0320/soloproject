const createRepository = (knex, table = 'users') => {
  const list = async (limit = 100) => {
    const res = await knex(table).select('*').limit(limit);
    return res;
  };

  return { list };
};

module.exports = { createRepository };
