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

      /* まずproducts tableへのinsert */
      /* stockに関しての大元の在庫量に関して不明だったので、一旦購入数で値を設定 */
      const insertProductsResult = await knex('products')
        .insert({
          name: body.itemName,
          price: body.itemPrice,
          stock: body.itemCount,
        })
        .returning('*');

      /* cart系 tableへのinsert */
      /* この時点でログインしているuserのuserIdを取得する */
      const usersInIdColumn = await knex('users').select('user_id');
      const targetUserId = [...usersInIdColumn].pop().user_id;
      /* それを元にcart tableのcolumnに値をinsert */
      const insertUsersResult = await knex('cart')
        .insert({ user_id: targetUserId })
        .returning('*');

      /* cart_itemsへのinsert */
      /* product_idがまだ未定だったがこの処理の前にproduct_idの作成が可能なことに気づいた。 */
      const insertCartItemsResult = await knex('cart_items')
        .insert({
          cart_id: insertUsersResult[0].cart_id,
          product_id: insertProductsResult[0].products_id,
          count: body.itemCount,
        })
        .returning('*');

      return res.send({
        massage: 'success',
      });
    }
  });

  /* login時のデータの取得 */
  app.post('/login', async (req, res) => {
    const body = req.body;
    const currentUserId = await knex('users')
      .insert({ name: body.userName, email: body.email })
      .returning('*');
    console.log(currentUserId);
    return res.send({ data: currentUserId[0] });
  });

  /* cartPageに移行時データの取得をして、そのデータを元にuiを作成 */
  app.get('/cart', async (req, res) => {
    /* これはtableをくっつけてdataを抽出しないといけないやつかも。。 */
    // const cartData = await knex("users").where("");
  });

  return app;
};

module.exports = { buildServer };
