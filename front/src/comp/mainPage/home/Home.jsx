import { Figure } from '../../section/figure/Figure';
import './Home.css';
import { FormSection } from '../../section/formSection/FormSection';
import { BigPhoto } from '../../section/bigPhotoSection/BigPhoto';
import { TextPR } from '../../section/textPR/TextPR';

/* 画像を右に一枚、その左に説明文を書きたい。 */
export const Home = () => {
  return (
    <section className="main-container">
      <Figure
        pictureURL={'../../public/001.jpg'}
        captionTitle={'プロの切れ味'}
        captionText={
          'test test test test test test test test test test test test test test test test test test test test'
        }
      />
      <TextPR />
      <BigPhoto BigPhotoURL={'../../public/002.jpg'} BigPhotoAlt={'ハサミ'} />
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
    </section>
  );
};
