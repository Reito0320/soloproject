import './FooterSection.css';
import { motion } from 'motion/react';

export const FooterSection = () => {
  const textArray = [
    'TELL: 000-4444-3333',
    'mail: scissors@hoge.jp',
    'place: xxx-ooo-cccc',
    'representative: G',
  ];
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <footer className="footer-section">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="left-section"
        >
          <motion.h1 variants={item} className="footer-title">
            inquiry
          </motion.h1>
          {textArray.map((text, index) => (
            <motion.p key={index} variants={item}>
              {text}
            </motion.p>
          ))}
          <motion.small variants={item}>© 2026 Reito inc.</motion.small>
        </motion.div>
        <motion.div
          className="right-section"
          initial={{ y: 30 }}
          whileHover={{ y: 0 }}
        >
          <iframe
            className="google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6483.54067802497!2d139.7249217760577!3d35.658029572594636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b76c785098b%3A0xc27855f1799f0b8!2zQ29kZSBDaHJ5c2FsaXMgfCDjgrPjg7zjg4njgq_jg6rjgrXjg6rjgrk!5e0!3m2!1sja!2sjp!4v1771497527761!5m2!1sja!2sjp"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </footer>
    </>
  );
};
