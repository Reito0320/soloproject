import { AnimationButton } from '../../atoms/button/AnimationButton';
import { FormSection } from '../../section/formSection/FormSection';
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
      <div className="section">
        <div className="login-box">
          <h1>ログアウトページ</h1>
          <AnimationButton buttonValue={'Logout'} onClickEvent={onClickEvent} />
        </div>
      </div>
      <FormSection
        titleArray={[
          'お名前',
          'フリガナ',
          '郵便番号',
          '住所',
          '電話番号',
          'メールアドレス',
        ]}
      />
    </>
  );
};
