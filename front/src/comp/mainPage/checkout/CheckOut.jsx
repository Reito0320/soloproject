import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import './CheckOut.css';
import { FooterSection } from '../../section/footerSection/FooterSection';
import { CheckoutInput } from '../../section/checkoutInput/CheckoutInput';
import { PrevOrder } from '../../section/prevOrder/PrevOrder';

export const CheckOut = ({ cartData, setCartData, paymentData }) => {
  const [prevOrderList, setPrevOrderList] = useState([]);

  const getSumPrice = () => {
    return (
      cartData.reduce((acc, cur) => acc + cur.price, 0) *
      cartData.reduce((acc, cur) => acc + cur.count, 0)
    );
  };

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
    } catch (error) {
      console.error('cartDataの取得に失敗しました。');
      throw new Error(error.message);
    }
  };

  const getPrevOrder = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('authData')).userId;
      const prevOrderResponse = await fetch('/api/checkout/prev/' + userId);
      const prevData = await prevOrderResponse.json();
      setPrevOrderList(prevData);
    } catch (error) {
      console.error('prevOrderの取得に失敗しました。');
      throw new Error(error.message);
    }
  };
  /* DB経由でcartの状態を更新し、uiの取得 */
  useEffect(() => {
    getCartData();
    getPrevOrder();
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
        sum price: {getSumPrice().toLocaleString()}
      </h2>

      <CheckoutInput
        cartData={cartData}
        sumPrice={getSumPrice()}
        paymentData={paymentData}
      />
      <PrevOrder prevOrderList={prevOrderList} />
      <FooterSection />
    </>
  );
};
