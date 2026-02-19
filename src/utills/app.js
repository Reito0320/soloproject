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

  /* cartに入れた商品と誰がどのcartを使っているかの情報吸い出し完了 */
  app.post('/api/shopping/:id', async (req, res) => {
    /* このbodyをどのtableに入れる? */
    const body = req.body;
    const params = Number(req.params.id);
    if (!params) {
      return res.status(406).send({
        type: 'error',
        message: '該当の商品がありません',
      });
    } else {
      /* まずどんな商品が選ばれたか */
      const targetProducts = await knex('products').where(
        'name',
        body.itemName,
      );
      /* それを元にcart tableのcolumnに値をinsert */
      const findCurrentUserCart = await knex('cart').where(
        'user_id',
        body.userId,
      );
      /* 初回のみcartの作成 */
      if (JSON.stringify(findCurrentUserCart) === JSON.stringify([])) {
        const insertUsersResult = await knex('cart')
          .insert({ user_id: body.userId })
          .returning('*');

        return res.send({
          massage: 'cartの作成が完了',
        });
      }
      // /* cart_itemsへのinsert */
      await knex('cart_items').insert({
        cart_id: findCurrentUserCart[0].cart_id,
        product_id: targetProducts[0].products_id,
        count: body.itemCount,
      });
      return res.send({
        massage: 'cart_itemsへの追加が完了',
      });
    }
  });

  /* login時のデータの取得 */
  app.post('/api/login', async (req, res) => {
    const body = req.body;
    const currentUserId = await knex('users')
      .insert({ name: body.userName, email: body.email })
      .returning('*');
    return res.send({ data: currentUserId[0] });
  });

  /* cartPageに移行時データの取得をして、そのデータを元にuiを作成 */
  app.get('/api/cart', async (req, res) => {
    /* currentUserIdの取得 */
    const currentUserId = Number(req.query.userId);
    /* それを元にcartの特定 */
    const cartResponse = await knex('cart').where('user_id', currentUserId);
    const targetCartId = cartResponse[0].cart_id;
    /* それを元にcart内部の商品の特定 */
    const targetCartInItems = await knex('cart_items').where(
      'cart_id',
      targetCartId,
    );
    /* table同士の結合をして、必要なcolumnだけを抜粋した配列を整形 */
    const joinData = await knex('cart')
      .join('cart_items', 'cart.cart_id', 'cart_items.cart_id')
      .join('products', 'cart_items.product_id', 'products.products_id')
      .select(
        'cart.cart_id',
        'cart.user_id',
        'cart_items.count',
        'products.name',
        'products.price',
        'products.path',
        'products.stock',
      )
      .where('cart.user_id', currentUserId);
    console.log('*******', joinData);
    return res.send(joinData);
  });

  /* 全データの取得 */
  app.get('/api/products', async (req, res) => {
    const allData = await knex('products').select('*');
    return res.json(allData);
  });

  /* productsのデータをparamsで選んで取得 */
  app.get('/api/products/:name', async (req, res) => {
    const params = req.params.name;
    if (Number(params)) {
      return res.status(406).send({
        type: 'error',
        message: '該当の商品がありません',
      });
    } else {
      const targetItem = await knex('products').where('name', params);
      if (JSON.stringify(targetItem) === JSON.stringify([])) {
        return res.status(406).send({
          type: 'error',
          message: '該当の商品がありません',
        });
      }
      return res.send(targetItem[0]);
    }
  });

  return app;
};

module.exports = { buildServer };
