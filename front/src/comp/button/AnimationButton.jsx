import { motion } from 'motion/react';
import './AnimationButton.css';

export const AnimationButton = ({ buttonValue, onClickEvent }) => {
  return (
    <motion.button
      onClick={onClickEvent}
      className="motion-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, y: 1 }}
    >
      {buttonValue}
    </motion.button>
  );
};
