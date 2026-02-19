import { AnimationButton } from '../../atoms/button/AnimationButton';
import { FooterSection } from '../../section/footerSection/FooterSection';
import './Logout.css';
import { useNavigate } from 'react-router-dom';

export const Logout = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const onClickEvent = () => {
    localStorage.clear();
    setIsLogin((prev) => !prev);
    navigate('/');
  };
  return (
    <>
      <div className="logout-section">
        <div className="login-box">
          <h1 className="logout-title">ログアウトページ</h1>
          <div className="logout-button-container">
            <AnimationButton
              buttonValue={'Logout'}
              onClickEvent={onClickEvent}
            />
          </div>
        </div>
      </div>
      <hr />
      <FooterSection />
    </>
  );
};
