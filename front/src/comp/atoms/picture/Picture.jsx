import { motion } from 'motion/react';
import './Picture.css';
export const Picture = ({ pictureSrc }) => {
  return (
    <motion.img
      className="shopping-picture"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      src={pictureSrc}
      alt="画像"
    ></motion.img>
  );
};
