import { motion, animate } from 'motion/react';
import './BigPhoto.css';

export const BigPhoto = ({ BigPhotoURL, BigPhotoAlt }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <img className="big-photo" src={BigPhotoURL} alt={BigPhotoAlt} />
    </motion.div>
  );
};
