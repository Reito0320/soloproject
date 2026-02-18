import './Header.css';
import { IoCart } from 'react-icons/io5';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { LuArchiveRestore } from 'react-icons/lu';

export const Header = () => {
  return (
    <>
      <nav className="navigation">
        <div>
          {/* loadingするとuserDataがなくなるので、本来はcookieを使いたいが一旦localに保存 */}
          {localStorage.getItem('isAuth') && (
            <div className="user-info">
              <img
                className="goggle-picture"
                src={JSON.parse(localStorage.getItem('authData')).photoURL}
                alt="userPicture"
              />
              <span className="user-name">
                {JSON.parse(localStorage.getItem('authData')).userName}
              </span>
            </div>
          )}
        </div>
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
              <LuArchiveRestore size={50} />
            </button>
          </Link>
          <Link to={'/cart'}>
            <button className="navigation-button">
              <IoCart size={50} />
            </button>
          </Link>
          {localStorage.getItem('isAuth') && (
            <Link to={'/logout'}>
              <button className="navigation-button">
                <CiLogout size={50} />;
              </button>
            </Link>
          )}
          {!localStorage.getItem('isAuth') && (
            <Link to={'/login'}>
              <button className="navigation-button">
                <CiLogin size={50} />
              </button>
            </Link>
          )}
        </div>
      </nav>
      <hr />
    </>
  );
};
