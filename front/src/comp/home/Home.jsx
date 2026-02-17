import { Figure } from '../figure/Figure';
import './Home.css';
import { FormSection } from '../formSection/FormSection';
import { BigPhoto } from '../bigPhotoSection/BigPhoto';
import { TextPR } from '../textPR/TextPR';

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
      <BigPhoto
        BigPhotoURL={'https://placehold.jp/1920x960.png'}
        BigPhotoAlt={'でか画像'}
      />
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
