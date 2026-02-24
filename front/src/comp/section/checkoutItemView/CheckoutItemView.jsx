import { motion } from 'motion/react';

export const CheckoutItemView = ({ cartData }) => {
  return (
    <div className="checkout-cart-section">
      {cartData.map((obj, index) => (
        <motion.div
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 1, y: -10 }}
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
  );
};
