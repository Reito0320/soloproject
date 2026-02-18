const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('./knex');

// const { initUsers } = require('../users/index');

const buildServer = () => {
  app.use(express.json());
  /* Reactとexpressのサーバーオリジンの差異からerrorを出していたので、このコードで改善 */
  app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  /* shopping items から情報の吸い出し完了 */
  app.post('/shopping/:id', async (req, res) => {
    /* このbodyをどのtableに入れる? */
    const body = req.body;
    const params = Number(req.params.id);
    if (!params) {
      return res.status(406).send({
        type: 'error',
        message: '該当の商品がありません',
      });
    } else {
      /* stock在庫管理に関して、また考える */
      await knex('products').insert({
        name: body.itemName,
        price: body.itemPrice,
        stock: body.itemCount,
      });
      return res.send({
        massage: 'success',
      });
    }
  });

  /* login時のデータの取得 */
  app.post('/login', async (req, res) => {
    const body = req.body;
    await knex('users').insert({ name: body.userName, email: body.email });
    return res.send({
      message: 'done',
    });
  });

  return app;
};

module.exports = { buildServer };
