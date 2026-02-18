import { motion } from 'motion/react';
import { Picture } from '../../atoms/picture/picture';
import { Link } from 'react-router-dom';
export const Shopping = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link to={'/shopping/004'}>
        <Picture pictureSrc={'../../../../public/004.jpg'} />
      </Link>
      <Picture pictureSrc={'../../../../public/004.jpg'} />
      <Picture pictureSrc={'../../../../public/004.jpg'} />
      <Picture pictureSrc={'../../../../public/004.jpg'} />
      <Picture pictureSrc={'../../../../public/004.jpg'} />
      <Picture pictureSrc={'../../../../public/004.jpg'} />
    </motion.div>
  );
};
