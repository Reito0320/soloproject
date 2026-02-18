import { FormSection } from '../../section/formSection/FormSection';
import './Logout.css';

export const Logout = () => {
  return (
    <>
      <div className="section">
        <div className="login-box">
          <h1>ログアウトページ</h1>
          <div className="button-cont"></div>
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
