import { useEffect, useState } from 'react';

export const CheckOut = ({ sumPrice, setSumPrice, cartData }) => {
  /* 
  これでいけなくもないが、更新すると消えるので、DB経由でのマウント時のレンダリングが1番いいかも。
  その次にlocalだけど、その後のDBの在庫管理とかcartの中の更新とかいろいろあるから前者での実装が良いと思う。
   */
  useEffect(() => {
    setSumPrice(cartData.reduce((acc, cur) => acc + cur.price, 0));
  }, []);
  return (
    <>
      <div>CheckOut</div>;
      <button onClick={() => console.log(sumPrice)}>test</button>
    </>
  );
};
