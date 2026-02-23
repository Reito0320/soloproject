import { useState } from 'react';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { Input } from '../../atoms/input/Input';
import './ShoppingItem.css';
import { easeInOut, motion } from 'motion/react';
import { ToastContainer, toast } from 'react-toastify';

export const ShoppingItem = ({
  price,
  itemTitle,
  pictureSrc,
  stock,
  products_id,
}) => {
  const [itemCount, setItemCount] = useState(0);
  const [isItemTakeInCart, setIsItemTakeInCart] = useState(false);

  /* cartに商品を登録する */
  const postCartData = async (stock) => {
    /* inputの入力がなかった場合の処理 */
    if (!itemCount) return;
    if (stock < itemCount) return toast.error('在庫を上回っています');

    const userId = JSON.parse(localStorage.getItem('authData')).userId;

    const userChoiceItem = JSON.stringify({
      itemName: itemTitle,
      itemPrice: price,
      itemCount: itemCount,
      products_id,
      userId: userId,
    });

    await fetch('/api/shopping/' + userId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: userChoiceItem,
    });
    setIsItemTakeInCart(true);
    document.querySelector('.shopping-item-input').value = '';
  };

  return (
    <>
      <section className="shopping-number-four-section">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ direction: 100, delay: 0.3, ease: easeInOut }}
        >
          <h2 className="item-title">{itemTitle}</h2>
          {isItemTakeInCart && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 3 }}
            >
              カートに追加しました。
            </motion.span>
          )}
          <p>価格: {Number(price).toLocaleString()}</p>
          <p>在庫数: {stock}</p>
          <div className="item-userInput-container">
            <ToastContainer />
            <Input
              className={'shopping-item-input'}
              inputTitle={'数量'}
              inputType={'tel'}
              maxLength={2}
              onChangeFunc={(e) => {
                setItemCount(Number(e.target.value));
                if (isItemTakeInCart) setIsItemTakeInCart(false);
              }}
            />
            <AnimationButton
              onClickEvent={() => postCartData(stock)}
              buttonValue={'カートへ'}
              className="shopping-animation-button"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img className="item-image" src={pictureSrc} alt="画像" />
        </motion.div>
      </section>
    </>
  );
};
