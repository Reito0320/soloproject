# 各スキーマの役割

## users table

### user DataDB

## products table

### 各商品のDB

## cart table

### userのcartDB

## cart_items table

### cartにitemが何個入っているかのDB

## order table

###

## order_items table

## apiのエンドポイントを叩くと得られる情報

### GET

```javascript
/* 全商品の情報を取得 */
const getAllProductsData = await fetch('/api/products');
```

```javascript
/* 商品を選んで情報を取得 */
const getTargetProductsData = await fetch('/api/products/:name');
```

```javascript
/* cartPageに移行時データの取得をし、そのデータを元にUIを作成 */
const get;
```

### POST

```javascript
/* users table とcart table にデータを追加 */
const postUsersAndCart = await fetch('/api/login');
```

```javascript
/* cart に user が追加したデータを cart_items table に追加*/
const postCartItem = await fetch('/api/shopping/:id');
```

### DELETE

```javascript
/* login user のcart 内の全ての商品を削除 */
const allDataDeleteResponse = await fetch('/api/cart', {
  method: 'DELETE',
});

/* login user の cart 内の商品を選択削除 */
app.delete('/api/cart/:userId', async (req, res) => {
  const targetId = req.body.cartId;
  await knex('cart_items').where('cart_items_id', targetId).delete();
  return res.end();
});
```

## setupの際のcommand

```shell
npm i
```

上記コマンドにて依存パッケージのダウンロード

### ローカル環境で試す場合

```shell
touch .env
```

.envファイルを作成。
環境変数を設定してください。

```
EC_HOST=
EC_NAME=
EC_USER=
EC_PORT=
EC_PASSWORD=
```

```shell
npm run migrate:rollback
```

DBをリセットしたい場合はこちらのコマンドを実行してください。

## 使用したライブラリ

### motion

```jsx
import { motion } from 'motion/react';

<motion.button
  onClick={onClickEvent}
  className="motion-button"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.9, y: 1 }}
>
  {buttonValue}
</motion.button>;
```

while...にてanimationの発火を制御できる。
個人的にはwhileInViewがおすすめ。
scrollアニメーションを簡単につけられます。
詳しいことは下記動画を見て、実践的な使い方を学びましょう。
https://www.youtube.com/watch?v=9-fO_2xTpgY
**公式ドキュメント**
https://motion.dev/

### toastify

```jsx
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

toast.success(targetDeleteItem.data + 'をcancelしました。');

<ToastContainer autoClose={1500} />;
```

itemを削除したり購入したりと、user側のアクションに対してのレスポンス通知をおしゃれにしてくれます。
実装も簡単ですし、設定も柔軟かつ簡単にできます。
こちらも動画で使い方を学べます。
https://www.youtube.com/watch?v=v5EMvzCe7bM
**公式ドキュメント**
https://fkhadra.github.io/react-toastify/introduction/

### reactIcon

```jsx
<FaRegUser size={30} />
```

icon画像を手軽にimportできます。
**公式ドキュメント**
https://react-icons.github.io/react-icons/

### reactRouter

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
```

front上のページ遷移をしてくれます。
**公式ドキュメント**
https://reactrouter.com/
