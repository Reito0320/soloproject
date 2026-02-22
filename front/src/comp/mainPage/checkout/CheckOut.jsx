import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import './CheckOut.css';
import { FooterSection } from '../../section/footerSection/FooterSection';
import { CheckoutInput } from '../../section/checkoutInput/CheckoutInput';
import { AnimationButton } from '../../atoms/button/AnimationButton';

export const CheckOut = ({ cartData, setCartData, paymentData }) => {
  /* DB経由でcartの状態を更新し、uiの取得 */
  /* paymentの選択まで進み入力が終わっている場合はこの入力をスキップする。 */
  useEffect(() => {
    const getCartData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('authData')).userId;
        const response = await fetch('/api/checkout/' + userId);
        const data = await response.json();
        const uniq = data.reduce((result, obj) => {
          result[obj.name] = obj;
          return result;
        }, {});
        const uniqData = Object.values(uniq);
        setCartData(uniqData);
      } catch {
        throw new Error('cart情報の取得に失敗しています。');
      }
    };
    getCartData();
    // setSumPrice(cartData.reduce((acc, cur) => acc + cur.price, 0));
  }, []);
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>check out page</h1>
      <div className="checkout-cart-section">
        {cartData.map((obj, index) => (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="checkout-item-card-container"
            key={index}
          >
            <img
              width={200}
              height={200}
              src={`/${obj.path}.jpg`}
              alt={obj.name}
            />
            <p className="checkout-item">name: {obj.name}</p>
            <p className="checkout-item">price: {obj.price.toLocaleString()}</p>
            <p className="checkout-item">count: {obj.count}</p>
            <p className="checkout-item">
              sum: {(obj.price * obj.count).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>

      <h2 style={{ textAlign: 'center' }}>
        sum price:{' '}
        {(
          cartData.reduce((acc, cur) => acc + cur.price, 0) *
          cartData.reduce((acc, cur) => acc + cur.count, 0)
        ).toLocaleString()}
      </h2>
      {localStorage.getItem('checkoutData') ? (
        <div className="checkoutinput-main">
          <div className="checkoutinput-section">
            {Object.values(
              JSON.parse(localStorage.getItem('checkoutData')),
            ).map((value, index) => (
              <p key={index}>{value}</p>
            ))}
            <AnimationButton
              className="checkoutinput-button"
              onClickEvent={() => console.log('done')}
              buttonValue={'done'}
            />
          </div>
        </div>
      ) : (
        <CheckoutInput paymentData={paymentData} />
      )}

      <FooterSection />
    </>
  );
};
