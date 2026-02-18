import './Login.css';
import { db, auth, provider } from '../../../utill/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { FormSection } from '../../section/formSection/FormSection';

export const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const userGoogleLogin = async () => {
    const res = await signInWithPopup(auth, provider);
    const authData = JSON.stringify({
      userName: res.user.displayName,
      email: res.user.email,
      photoURL: res.user.photoURL,
    });
    /* 本当はクッキーを使いたい */
    localStorage.setItem('authData', authData);
    localStorage.setItem('isAuth', true);

    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: authData,
    });

    setIsLogin((prev) => !prev);
    navigate('/');
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
