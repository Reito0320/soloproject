import './Header.css';
import { IoCart } from 'react-icons/io5';
import { CiMenuBurger } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <nav className="navigation">
        <span>ここにuserのログイン情報を出したい</span>
        <div className="navigation-leftBlock">
          <Link to={'/'}>
            <img
              /* 一旦サイズの仮置き */
              width={200}
              height={150}
              className="navigation-leftBlock-logo"
              src="../../../public/scissors_logo.png"
              alt="scissors_logo"
            />
          </Link>
        </div>
        <div className="navigation-rightBlock">
          <Link to={'/shopping'}>
            <button className="navigation-cartButton">
              <IoCart size={50} />
            </button>
          </Link>
          <Link to={'/logout'}>
            <button className="navigation-button">
              <CiLogout size={50} />;
            </button>
          </Link>
          <button className="navigation-button">
            <CiMenuBurger size={50} />
          </button>
        </div>
      </nav>
      <hr />
    </>
  );
};
