import './Login.css';
import { db, auth, provider } from '../../../utill/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { FormSection } from '../../section/formSection/FormSection';

export const Login = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const userGoogleLogin = async () => {
    const res = await signInWithPopup(auth, provider);
    localStorage.setItem('isAuth', true);
    setUserData(res);
    navigate('/home');
  };
  return (
    <>
      <div className="section">
        <div className="login-box">
          <h1>ログインページ</h1>
          <div className="button-cont">
            <AnimationButton
              onClickEvent={userGoogleLogin}
              buttonValue={'Google'}
            ></AnimationButton>

            <AnimationButton
              // onClickEvent={userLoginFunc}
              buttonValue={'GitHub'}
            ></AnimationButton>
            <AnimationButton
              // onClickEvent={userLoginFunc}
              buttonValue={'Line'}
            ></AnimationButton>
          </div>
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
