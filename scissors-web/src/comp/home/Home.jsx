import { Figure } from '../figure/Figure';
import './Home.css';
import { FormSection } from '../formSection/FormSection';
import { BigPhoto } from '../bigPhotoSection/BigPhoto';

/* 画像を右に一枚、その左に説明文を書きたい。 */
export const Home = () => {
  return (
    <section className="main-container">
      <Figure
        pictureURL={'https://placehold.jp/500x500.png'}
        captionTitle={'卓越した匠の技術'}
        captionText={
          'test test test test test test test test test test test test test test test test test test test test'
        }
      />
      <BigPhoto
        BigPhotoURL={'https://placehold.jp/1920x960.png'}
        BigPhotoAlt={'でか画像'}
      />

      <BigPhoto
        BigPhotoURL={'https://placehold.jp/1920x960.png'}
        BigPhotoAlt={'でか画像'}
      />
      <FormSection />
    </section>
  );
};
