const createService = (repository) => {
  const list = async (limit) => {
    return await repository.list(limit);
  };

  return { list };
};

module.exports = { createService };
