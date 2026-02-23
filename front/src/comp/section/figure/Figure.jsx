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
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: easeIn }}
      // whileHover={{ scale: 1.05 }}
    >
      <figure className="figure">
        <div className="caption-side">
          <h1 className="caption-title">{captionTitle}</h1>
          <p>精密に研がれた刃が職人品質で長く使えるハサミ</p>
          <p>使い手の使いやすさに極限までこだわり抜いた逸品</p>
          <p>普段使いから、プロ仕様まで幅広く販売しています。</p>
          <p>修理のご相談も承っておりますのでお気軽にご相談ください。</p>
        </div>
        <img className="image" src={pictureURL} alt={pictureAlt} />
      </figure>
    </motion.div>
  );
};
