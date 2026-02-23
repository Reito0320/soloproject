import './Login.css';
import { db, auth, provider } from '../../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { FooterSection } from '../../section/footerSection/FooterSection';

/* loginデータのinsertとlocalstorageへの保存と現在ログイン中のuserのidを取得 */
/* 三つも仕事をしているので役割を分けたい */
export const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const userGoogleLogin = async () => {
    const res = await signInWithPopup(auth, provider);
    const authData = {
      userName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
    /* 本当はクッキーを使いたい */
    localStorage.setItem('authData', JSON.stringify(authData));
    localStorage.setItem('isAuth', true);

    authData.email = res.user.email;
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });

    /* insertしてincrementされたidを取得しlocalstorageへ保存 */
    const result = await response.json();
    const currentUserId = result.data.user_id;

    const userData = JSON.parse(localStorage.getItem('authData'));
    userData.userId = currentUserId;
    localStorage.setItem('authData', JSON.stringify(userData));

    setIsLogin((prev) => !prev);
    navigate('/');
    location.reload();
  };
  return (
    <>
      <div className="section">
        <div className="login-box">
          <h1>ログインページ</h1>
          <div className="login-button-container">
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
      <FooterSection />
    </>
  );
};
