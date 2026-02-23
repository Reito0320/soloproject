import { useEffect } from 'react';
import { motion } from 'motion/react';
import './Cart.css';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { useNavigate } from 'react-router-dom';
import { FooterSection } from '../../section/footerSection/FooterSection';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export const Cart = ({ deleteFlag, setDeleteFlag, cartData, setCartData }) => {
  const navigate = useNavigate();

  const deleteAll = async () => {
    const currentUserId = JSON.parse(localStorage.getItem('authData')).userId;
    await fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUserId }),
    });
    navigate('/shopping');
  };

  const targetDelete = async (cartItemsId) => {
    const currentUserId = JSON.parse(localStorage.getItem('authData')).userId;
    const response = await fetch(`/api/cart/${currentUserId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId: cartItemsId }),
    });
    const targetDeleteItem = await response.json();
    toast.warning(targetDeleteItem.data + 'をcancelしました。');
    setDeleteFlag((prev) => !prev);
  };

  /* 結合したtableをfetchして、それをstateにset */
  /* 第二引数こだわりポイント */
  useEffect(() => {
    const getCartData = async () => {
      const currentUserId = JSON.parse(localStorage.getItem('authData')).userId;
      const response = await fetch('/api/cart/' + currentUserId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      /* 重複した注文を最新のものに更新 */
      const uniq = data.reduce((result, obj) => {
        result[obj.name] = obj;
        return result;
      }, {});
      const uniqData = Object.values(uniq);
      setCartData(uniqData);
    };
    getCartData();
  }, [deleteFlag]);

  return (
    <>
      <main className="cart-main">
        <ToastContainer autoClose={1500} />
        <h1 className="cart-page-title">My Cart</h1>
        {cartData.map((obj, index) => {
          return (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ x: -20 }}
                transition={{ duration: 0.8 }}
                className="cart-data-column"
              >
                <img
                  width={640}
                  height={427}
                  src={`/${obj.path}.jpg`}
                  alt="画像"
                />
                <div className="item-container">
                  <p>item name:</p>
                  <p>{obj.name}</p>
                </div>
                <div>
                  <p>price</p>
                  <p>{Number(obj.price).toLocaleString()}</p>
                </div>
                <div>
                  <p>count</p>
                  <p>{obj.count}</p>
                </div>
                <div>
                  <p>sum</p>
                  <p>{(obj.price * obj.count).toLocaleString()}</p>
                </div>
              </motion.div>
              <div className="button-container">
                <AnimationButton
                  className="test"
                  /* ここの引数に特定できる */
                  onClickEvent={() => targetDelete(obj.cart_items_id)}
                  buttonValue={'cancel'}
                />
              </div>
            </div>
          );
        })}
        <div>
          <div className="cart-button-container">
            {cartData.length !== 0 && (
              <Link to={'/checkOut'}>
                <AnimationButton buttonValue={'check out'} />
              </Link>
            )}
            <AnimationButton
              onClickEvent={deleteAll}
              buttonValue={'All cancel'}
            />
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};
