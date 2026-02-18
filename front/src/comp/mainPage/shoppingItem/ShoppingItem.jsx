import { useState } from 'react';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { Input } from '../../atoms/input/Input';
import './ShoppingItem.css';
import { easeInOut, motion } from 'motion/react';

export const ShoppingItem = ({ price, itemTitle, pictureSrc }) => {
  const [itemCount, setItemCount] = useState(0);

  const getUserTakeInCartData = async () => {
    if (!itemCount) return;

    const result = JSON.stringify({
      itemName: itemTitle,
      itemPrice: price,
      itemCount: itemCount,
    });
    await fetch('http://localhost:3000/shopping/004', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: result,
    });
  };
  return (
    <section className="shopping-number-four-section">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ direction: 100, delay: 0.3, ease: easeInOut }}
      >
        <h2 className="item-title">{itemTitle}</h2>
        <p>価格: {price}</p>
        <div className="item-userInput-container">
          <Input
            className={'shopping-item-input'}
            inputTitle={'数量'}
            inputType={'number'}
            onChangeFunc={(e) => setItemCount(Number(e.target.value))}
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
  );
};
