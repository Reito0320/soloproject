import { motion } from 'motion/react';
import './TextPR.css';
export const TextPR = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <hr />
      <div className="text-container">
        <h2 className="sub-title">私たちのポリシー</h2>
        <p>使い手から選ばれるクオリティ</p>
        <p>使い手の笑顔からお客様の笑顔へ</p>
        <p>こだわりがハサミを介して広がる</p>
        <p>そんな笑顔を思いながら、</p>
        <p>精一杯取り組んでおります。</p>
      </div>
      <hr />
    </motion.div>
  );
};
