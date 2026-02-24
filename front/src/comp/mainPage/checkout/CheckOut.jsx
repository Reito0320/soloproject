import { useEffect, useState } from 'react';
import './CheckOut.css';
import { FooterSection } from '../../section/footerSection/FooterSection';
import { CheckoutInput } from '../../section/checkoutInput/CheckoutInput';
import { CheckoutItemView } from '../../section/checkoutItemView/CheckoutItemView';

export const CheckOut = ({ cartData, setCartData, paymentData }) => {
  const [prevOrderList, setPrevOrderList] = useState(null);

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
      <CheckoutItemView cartData={cartData} />
      <h2 style={{ textAlign: 'center' }}>
        sum price: {getSumPrice().toLocaleString()}
      </h2>
      <CheckoutInput
        cartData={cartData}
        sumPrice={getSumPrice()}
        paymentData={paymentData}
      />
      {prevOrderList && (
        <div className="checkout-previous-items-container">
          <div className="checkout-prevItems">
            <h2 style={{ color: 'white' }}>previous order Items</h2>
            <CheckoutItemView cartData={prevOrderList} />
          </div>
        </div>
      )}
      <FooterSection />
    </>
  );
};
