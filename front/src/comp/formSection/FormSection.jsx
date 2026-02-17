import './FormSection.css';

/* 
一つ一つのinputにこのアニメーションつけたい
https://motion.dev/docs/react#:~:text=%7D%7D%20/%3E-,%E3%83%9B%E3%83%90%E3%83%BC%EF%BC%86%E3%82%BF%E3%83%83%E3%83%97%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3,-%3Cmotion%20/%3E%E5%BC%B7%E5%8A%9B
*/
export const FormSection = () => {
  return (
    <form className="form-section">
      <h1>お問合せ</h1>
      <div className="form-back">
        <label>
          お名前
          <input name="name" type="text" />
        </label>

        <label>
          {' '}
          フリガナ
          <input name="name-furigana" type="text" />
        </label>
        <label>
          郵便番号
          <input type="text" name="post-number" />
        </label>
        <label>
          住所
          <input name="home" type="text" />
        </label>
        <label>
          電話番号
          <input type="number" name="tell" />
        </label>
        <label>
          メールアドレス
          <input type="email" name="address" />
        </label>
        <label>
          店名
          <input name="company" type="text" />
        </label>
        <label>
          詳細
          <textarea name="other"></textarea>
        </label>
      </div>
    </form>
  );
};
