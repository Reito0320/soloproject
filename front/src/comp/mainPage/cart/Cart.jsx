import { useEffect, useState } from 'react';

export const Cart = () => {
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('isAuth')) return;
    const getData = async () => {
      const response = await fetch('http://localhost:/3000/cart', {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data);
    };
    getData();
  });
  return (
    <main>
      <h1>カートの中</h1>
      <section></section>
    </main>
  );
};
