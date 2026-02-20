import { Figure } from '../../section/figure/Figure';
import './Home.css';
import { FooterSection } from '../../section/footerSection/FooterSection';
import { BigPhoto } from '../../section/bigPhotoSection/BigPhoto';
import { TextPR } from '../../section/textPR/TextPR';

/* 画像を右に一枚、その左に説明文を書きたい。 */
export const Home = () => {
  return (
    <>
      <section className="main-container">
        <Figure
          pictureURL={'/001.jpg'}
          captionTitle={'プロの切れ味'}
          captionText={
            'test test test test test test test test test test test test test test test test test test test test'
          }
        />
        <TextPR />
        <BigPhoto BigPhotoURL={'/002.jpg'} BigPhotoAlt={'ハサミ'} />
        <FooterSection />
      </section>
    </>
  );
};
