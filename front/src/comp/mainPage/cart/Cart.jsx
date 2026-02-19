import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import './Cart.css';
import { AnimationButton } from '../../atoms/button/AnimationButton';

export const Cart = () => {
  const [cartData, setCartData] = useState([]);

  /* delbuttonを押したらその要素をDBの中のcartから消す */
  const onClickEvent = async () => {
    // const
  };

  /* 結合したtableをfetchして、それをstateにset */
  useEffect(() => {
    const getCartData = async () => {
      const currentUserId = JSON.parse(localStorage.getItem('authData')).userId;
      const response = await fetch(
        'http://localhost:3000/api/cart?userId=' + currentUserId,
      );
      const data = await response.json();
      console.log(data);
      setCartData(data);
    };
    getCartData();
  }, []);

  return (
    <main>
      <h1 className="cart-page-title">My Cart</h1>
      {cartData.map((obj, index) => {
        return (
          <div key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="cart-data-column"
            >
              <img src={`../../../../public/${obj.path}.jpg`} alt="画像" />
              <div className="item-container">
                <p>item name:</p>
                <p>{obj.name}</p>
              </div>
              <div>
                <p>price</p>
                <p>{obj.price}</p>
              </div>
              <div>
                <p>count</p>
                <p>{obj.count}</p>
              </div>
              <div>
                <p>sum</p>
                <p>{obj.price * obj.count}</p>
              </div>
            </motion.div>
            <div className="button-container">
              <AnimationButton
                className="test"
                onClickEvent={onClickEvent}
                buttonValue={'cancel'}
              />
            </div>
          </div>
        );
      })}
      <button onClick={() => console.log(cartData)}>test</button>
    </main>
  );
};
