import { useState } from 'react';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { Input } from '../../atoms/input/Input';
import './ShoppingItem.css';
import { easeInOut, motion } from 'motion/react';
import { FooterSection } from '../../section/footerSection/FooterSection';

export const ShoppingItem = ({ price, itemTitle, pictureSrc, stock }) => {
  const [itemCount, setItemCount] = useState(0);
  const [isItemTakeInCart, setIsItemTakeInCart] = useState(false);

  /* cartに商品を登録する */
  const getUserTakeInCartData = async () => {
    if (!itemCount) return;

    const userId = JSON.parse(localStorage.getItem('authData')).userId;

    const result = JSON.stringify({
      itemName: itemTitle,
      itemPrice: price,
      itemCount: itemCount,
      userId: userId,
    });
    await fetch('http://localhost:3000/api/shopping/004', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: result,
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
          <p>価格: {price}</p>
          <p>在庫数: {stock}</p>
          <div className="item-userInput-container">
            <Input
              className={'shopping-item-input'}
              inputTitle={'数量'}
              inputType={'number'}
              onChangeFunc={(e) => {
                setItemCount(Number(e.target.value));
                if (isItemTakeInCart) setIsItemTakeInCart(false);
              }}
            />
            <AnimationButton
              onClickEvent={getUserTakeInCartData}
              buttonValue={'カートへ'}
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
