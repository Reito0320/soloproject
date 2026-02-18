import { motion, animate, easeInOut } from 'motion/react';
import './BigPhoto.css';

export const BigPhoto = ({ BigPhotoURL, BigPhotoAlt }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: easeInOut }}
    >
      <img className="big-photo" src={BigPhotoURL} alt={BigPhotoAlt} />
    </motion.div>
  );
};
