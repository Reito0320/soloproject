const express = require('express');
const app = express();
const knex = require('./knex');
const path = require('path');

// const { initUsers } = require('../users/index');

const buildServer = () => {
  app.use(express.json());

  /* このコードでbuild時に静的ファイルを参照できる
  build時の静的ファイルにはfrontの情報が詰まっている */
  app.use(express.static(path.join(__dirname, '../public')));

  /* cartに入れた商品と誰がどのcartを使っているかの情報吸い出し完了 */

  /* login時のデータの取得とcartの作成 */
  app.post('/api/login', async (req, res) => {
    const body = req.body;
    const currentUserId = await knex('users')
      .insert({ name: body.userName, email: body.email })
      .returning('*');

    /* userのcartを作成 */
    await knex('cart').insert({ user_id: currentUserId[0].user_id });

    return res.send({ data: currentUserId[0] });
  });

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
      const findCurrentUserCart = await knex('cart').where(
        'user_id',
        body.userId,
      );
      await knex('cart_items').insert({
        cart_id: findCurrentUserCart[0].cart_id,
        product_id: body.products_id,
        count: body.itemCount,
      });
      return res.send({
        massage: 'cart_itemsへの追加が完了',
      });
    }
  });

  /* cartPageに移行時データの取得をして、そのデータを元にuiを作成 */
  app.get('/api/cart/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    if (!userId) return res.end();

    /* table同士の結合をして、必要なcolumnだけを抜粋した配列を整形 */
    const joinData = await knex('cart')
      .join('cart_items', 'cart.cart_id', 'cart_items.cart_id')
      .join('products', 'cart_items.product_id', 'products.products_id')
      .select(
        'cart.cart_id',
        'cart.user_id',
        'cart_items.count',
        'cart_items.cart_items_id',
        'products.name',
        'products.price',
        'products.path',
        'products.stock',
      )
      .where('cart.user_id', userId);

    return res.send(joinData);
  });

  /* 現在login中userのcart内の商品を全削除 */
  app.delete('/api/cart', async (req, res) => {
    const userId = req.body.userId;
    await knex('cart_items').where('cart_id', userId).delete();
    return res.end();
  });

  /* 指定した現在login中のuserのcartを削除 */
  app.delete('/api/cart/:userId', async (req, res) => {
    const targetId = req.body.cartId;
    const delItem = await knex('cart_items')
      .where('cart_items_id', targetId)
      .delete()
      .returning('*');
    const productId = delItem[0].product_id;
    const targetItemData = await knex('products').where(
      'products_id',
      productId,
    );
    return res.send({ data: targetItemData[0].name });
  });

  /* 全データの取得 */
  app.get('/api/products', async (req, res) => {
    const allData = await knex('products').select('*');
    return res.send(allData);
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

  /* cart内のデータをcheckoutPageに表示 */
  app.get('/api/checkout/:userId', async (req, res) => {
    const userId = req.params.userId;
    /* userid経由でcartの中身を出力 */
    const joinData = await knex('cart')
      .join('cart_items', 'cart.cart_id', 'cart_items.cart_id')
      .join('products', 'cart_items.product_id', 'products.products_id')
      .select(
        'cart.cart_id',
        'cart.user_id',
        'cart_items.count',
        'cart_items.cart_items_id',
        'products.name',
        'products.price',
        'products.path',
        'products.stock',
      )
      .where('cart.user_id', userId);
    return res.send(joinData);
  });

  /* 全ての入力が完了した後にcheckoutPageのクリーンアップ */
  app.delete('/api/checkout/:userId', async (req, res) => {
    const userId = req.params.userId;
    await knex('cart_items').where('cart_id', userId).delete();
    return res.end();
  });

  app.patch('/api/checkout/:userId', async (req, res) => {
    const userId = req.params.userId;
    const cartItems = await knex('cart_items').where('cart_id', userId);
    let index = 0;
    for (const obj of cartItems) {
      const targetProducts = await knex('products').where(
        'products_id',
        obj.product_id,
      );
      await knex('products')
        .where('products_id', obj.product_id)
        .update({ stock: targetProducts[0].stock - obj.count });
      index++;
    }
    return res.send({ message: 'Good' });
  });

  /* paymentMethodsのデータを一時post */
  app.post('/api/paymentMethods/:type', async (req, res) => {
    const type = req.params.type;
    const body = req.body;
    if (type === 'credit') {
      await knex('credit').insert({
        user_id: body.userId,
        credit_number: body.number,
        credit_name: body.name,
        credit_expiry: body.expiry,
        credit_cvc: body.cvc,
      });
      return res.send({ message: 'credit Posted' });
    }
    return res.send({ message: 'Good' });
  });

  /* 支払い種別によって格納するtableを変える */
  app.get('/api/paymentMethods/:type', async (req, res) => {
    const type = req.params.type;
    return res.send({ message: 'credit' });
  });

  /* order tableにデータをpost */
  app.post('/api/order', async (req, res) => {
    const body = req.body;
    await knex('order').insert({
      user_id: body.userId,
      orderDate: body.orderDate,
      total: body.total,
    });
    return res.send({ message: 'orderGood' });
  });

  /* orderItem tableに対してpost */
  app.post('/api/orderItem', async (req, res) => {
    const body = req.body;
    const targetOrderData = await knex('order').where(
      'user_id',
      body.cartData[0].user_id,
    );
    const cash = [];
    for (const obj of body.cartData) {
      const foo = await knex('products').where('name', obj.name);
      cash.push(foo[0]);
    }
    const targetOrderId = targetOrderData.pop().order_id;
    let count = 0;
    for (const obj of body.cartData) {
      await knex('order_items').insert({
        order_id: targetOrderId,
        product_id: cash[count++].products_id,
        count: obj.count,
        price: obj.price,
      });
    }
    return res.send({ message: 'orderItemGood' });
  });
  return app;
};

module.exports = { buildServer };
