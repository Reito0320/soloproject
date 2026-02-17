import './FormSection.css';
import { motion } from 'motion/react';
/* 
一つ一つのinputにこのアニメーションつけたい
https://motion.dev/docs/react#:~:text=%7D%7D%20/%3E-,%E3%83%9B%E3%83%90%E3%83%BC%EF%BC%86%E3%82%BF%E3%83%83%E3%83%97%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3,-%3Cmotion%20/%3E%E5%BC%B7%E5%8A%9B
*/
export const FormSection = ({ titleArray }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <form className="form-section">
      <h1 className="title">お問合せ</h1>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="form-back"
        viewport={{ once: true }}
      >
        {titleArray.map((ele, index) => {
          return (
            <motion.label
              whileHover={{ scale: 1.05 }}
              variants={item}
              key={index}
            >
              {ele}
              <input name="name" type="text" />
            </motion.label>
          );
        })}
      </motion.div>
    </form>
  );
};
