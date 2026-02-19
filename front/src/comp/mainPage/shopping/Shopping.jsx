import './Shopping.css';
import { motion, easeIn } from 'motion/react';
import { Picture } from '../../atoms/picture/picture';
import { Link } from 'react-router-dom';
import { FooterSection } from '../../section/footerSection/FooterSection';

export const Shopping = ({ productsData }) => {
  return (
    <>
      <h1 className="store-title">Store</h1>
      {productsData.map((obj, index) => {
        return (
          <div key={index}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: easeIn }}
              className="cart-data-column"
            >
              <Link className="link-section" to={`/shopping/${obj.path}`}>
                <Picture pictureSrc={`../../../../public/${obj.path}.jpg`} />
              </Link>
              <div className="item-container">
                <p>item name:</p>
                <p>{obj.name}</p>
              </div>
              <div>
                <p>price</p>
                <p>{obj.price}</p>
              </div>
              <div>
                <p>stock</p>
                <p>{obj.stock}</p>
              </div>
            </motion.div>
          </div>
        );
      })}
      <FooterSection />
    </>
  );
};
