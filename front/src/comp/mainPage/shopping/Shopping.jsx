import './Shopping.css';
import { motion } from 'motion/react';
import { Picture } from '../../atoms/picture/picture';
import { Link } from 'react-router-dom';
export const Shopping = () => {
  return (
    <motion.div
      className="shopping-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link to={'/shopping/004'}>
        <Picture pictureSrc={'../../../../public/004.jpg'} />
      </Link>
      <Link to={'/shopping/005'}>
        <Picture pictureSrc={'../../../../public/005.jpg'} />
      </Link>
      <Link to={'/shopping/008'}>
        <Picture pictureSrc={'../../../../public/008.jpg'} />
      </Link>
      <Link to={'/shopping/009'}>
        <Picture pictureSrc={'../../../../public/009.jpg'} />
      </Link>
      <Link to={'/shopping/002'}>
        <Picture pictureSrc={'../../../../public/002.jpg'} />
      </Link>
      <Link to={'/shopping/003'}>
        <Picture pictureSrc={'../../../../public/003.jpg'} />
      </Link>
    </motion.div>
  );
};
