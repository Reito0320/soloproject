const express = require('express');
const app = express();

const buildServer = () => {
  app.use(express.json());
  // app.use(express.static(__dirname, 'public'));
  app.get('/api', (req, res) => {
    return res.send('こんにちは');
  });

  return app;
};

module.exports = { buildServer };
