# migrationとseedに関して

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

###

# apiのエンドポイントを叩くと得られる情報

## productのDataを取得

```javascript
app.get('/api/products', async (req, res) => {
  const allData = await knex('products').select('*');
  return res.json(allData);
});
```

## 現在login中userのcart内の商品を削除

```javascript
/* 全件一括削除 */
app.delete('/api/cart', async (req, res) => {
  const userId = req.body.userId;
  await knex('cart_items').where('cart_id', userId).delete();
  return res.end();
});
/* 商品選択削除 */
app.delete('/api/cart/:userId', async (req, res) => {
  const targetId = req.body.cartId;
  await knex('cart_items').where('cart_items_id', targetId).delete();
  return res.end();
});
```

# setupの際のcommand

# 使用したライブラリ

## motion

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

### 公式ドキュメント

https://motion.dev/

## toastify

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

### 公式ドキュメント

https://fkhadra.github.io/react-toastify/introduction/

## reactIcon

```jsx
<FaRegUser size={30} />
```

icon画像を手軽にimportできます。

### 公式ドキュメント

https://react-icons.github.io/react-icons/

## reactRouter

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

### 公式ドキュメント

https://reactrouter.com/
