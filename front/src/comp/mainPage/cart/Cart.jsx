import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import './Cart.css';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { useNavigate } from 'react-router-dom';
import { FooterSection } from '../../section/footerSection/FooterSection';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const navigate = useNavigate();

  const deleteAll = async () => {
    const currentUserId = JSON.parse(localStorage.getItem('authData')).userId;
    const foo = await fetch('http://localhost:3000/api/cart/' + currentUserId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(foo);
    navigate('/shopping');
  };

  const targetDelete = async (cartItemsId) => {
    const currentUserId = JSON.parse(localStorage.getItem('authData')).userId;
    await fetch(`http://localhost:3000/api/cart/${currentUserId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId: cartItemsId }),
    });
    setDeleteFlag((prev) => !prev);
  };

  /* 結合したtableをfetchして、それをstateにset */
  /* 第二引数こだわりポイント */
  useEffect(() => {
    const getCartData = async () => {
      const currentUserId = JSON.parse(localStorage.getItem('authData')).userId;
      const response = await fetch(
        'http://localhost:3000/api/cart?userId=' + currentUserId,
      );
      const data = await response.json();
      setCartData(data);
    };
    getCartData();
  }, [deleteFlag]);

  return (
    <>
      <main className="cart-main">
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
                <img
                  width={640}
                  height={427}
                  src={`../../../../public/${obj.path}.jpg`}
                  alt="画像"
                />
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
            <Link to={'/checkOut'}>
              <AnimationButton buttonValue={'check out'} />
            </Link>
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
