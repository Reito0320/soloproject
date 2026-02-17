import { easeIn, motion } from 'motion/react';
import './Figure.css';

export const Figure = ({
  pictureURL,
  pictureAlt,
  captionTitle,
  captionText,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: easeIn }}
      // whileHover={{ scale: 1.05 }}
    >
      <figure className="figure">
        <div className="caption-side">
          <h1>{captionTitle}</h1>
          <figcaption className="figcaption">{captionText}</figcaption>
        </div>
        <img className="image" src={pictureURL} alt={pictureAlt} />
      </figure>
    </motion.div>
  );
};
