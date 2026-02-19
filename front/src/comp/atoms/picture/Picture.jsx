import { motion } from 'motion/react';

export const Picture = ({ pictureSrc }) => {
  return (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="picture-comp"
      src={pictureSrc}
      alt="画像"
    ></motion.img>
  );
};
