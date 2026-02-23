import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { motion } from 'motion/react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { useNavigate } from 'react-router-dom';
import './PaymentMethod.css';
import { ToastContainer, toast } from 'react-toastify';
import { Input } from '../../atoms/input/Input';

export const PaymentMethod = ({ setPaymentData }) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const navigate = useNavigate();

  const creditInputEmptyCheck = (data) => {
    const emptyData = Object.keys(data).filter((key) => data[key] === '');
    if (emptyData.length === 0) return;
    let test = false;
    emptyData.forEach((ele) => {
      if (ele === 'number') {
        toast.error('カード番号が入力されていません。');
        test = true;
      }
      if (ele === 'name') {
        toast.error('カード名義が入力されていません。');
        test = true;
      }
      if (ele === 'expiry') {
        toast.error('有効期限が入力されていません。');
        test = true;
      }
      if (ele === 'cvc') {
        toast.error('セキュリティーコードが入力されていません。');
        test = true;
      }
    });
    return test;
  };

  const creditInputLengthCheck = (data) => {
    let test = false;
    Object.keys(data).forEach((ele) => {
      if (ele === 'expiry' && data[ele].length < 4) {
        toast.error('有効期限の文字数に誤りがあります。');
        test = true;
      }
      if (ele === 'cvc' && data[ele].length < 3) {
        toast.error('セキュリティーコードの文字数に誤りがあります。');
        test = true;
      }
    });
    return test;
  };

  const creditInputRegTestCheck = (data) => {
    let test = false;
    Object.keys(data).forEach((ele) => {
      if (ele === 'number' && new RegExp(/[^0-9]/).test(data[ele])) {
        toast.error('カード番号に不正な値が入力されています。');
        test = true;
      }
      if (ele === 'name' && new RegExp(/[0-9]/).test(data[ele])) {
        toast.error('カード名義に不正な値が入力されています。');
        test = true;
      }
      if (ele === 'expiry' && new RegExp(/[^0-9]/).test(data[ele])) {
        toast.error('有効期限に不正な値が入力されています。');
        test = true;
      }
      if (ele === 'cvc' && new RegExp(/[^0-9]/).test(data[ele])) {
        toast.error('セキュリティーコードに不正な値が入力されています。');
        test = true;
      }
    });
    return test;
  };

  const postCreditData = async (data) => {
    data.userId = JSON.parse(localStorage.getItem('authData')).userId;
    await fetch('/api/paymentMethods/credit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  const sendCreditData = () => {
    const creditData = {
      number,
      name: name.toLocaleUpperCase(),
      expiry,
      cvc,
    };
    /* 入力がされていない欄を抽出し、入力を促すalert */
    if (creditInputEmptyCheck(creditData)) return;
    /* それぞれの要素の文字数が制約を満たしているか査定し、修正のalert */
    if (creditInputLengthCheck(creditData)) return;
    /* それぞれの要素が正規化されているかを査定し、修正のalert */
    if (creditInputRegTestCheck(creditData)) return;
    toast.success('登録が完了しました。');
    /* credit_tableにpost */
    postCreditData(creditData);

    setPaymentData(creditData);
    setTimeout(() => {
      navigate('/checkout');
    }, 3000);
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      {/* 支払い方法を決めるbutton */}
      {!paymentMethod && (
        <div className="credit-initial-button-container">
          <h2>Payment method</h2>
          <AnimationButton
            buttonValue={'bank transfer'}
            onClickEvent={() => setPaymentMethod('bank')}
            isDisabled={true}
          />
          <AnimationButton
            buttonValue={'credit card'}
            onClickEvent={() => setPaymentMethod('credit')}
          />
          <AnimationButton isDisabled={false} buttonValue={'cash on'} />
        </div>
      )}
      {paymentMethod === 'bank' && (
        <div className="credit-bank-page">
          <h2>bank</h2>
          <Input inputTitle={''} />
          <AnimationButton
            buttonValue={'send'}
            onClickEvent={() => console.log('hi')}
          />
          <AnimationButton
            buttonValue={'back'}
            onClickEvent={() => setPaymentMethod('')}
          />
        </div>
      )}
      {paymentMethod === 'credit' && (
        <div className="payment-credit">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
          <form className="payment-input-container">
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ direction: 0.8 }}
              whileTap={{ y: -10 }}
              type="tel"
              maxLength={16}
              name="number"
              value={number}
              placeholder="カード番号"
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ direction: 0.8 }}
              whileTap={{ y: -10 }}
              type="text"
              name="name"
              maxLength={17}
              value={name}
              placeholder="カード名義"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ direction: 0.8 }}
              whileTap={{ y: -10 }}
              type="tel"
              maxLength={4}
              name="expiry"
              value={expiry}
              placeholder="有効期限"
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ direction: 0.8 }}
              whileTap={{ y: -10 }}
              type="tel"
              name="cvc"
              maxLength={3}
              value={cvc}
              placeholder="セキュリティーコード"
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </form>
          <div className="payment-button-container">
            <AnimationButton
              buttonValue={'send'}
              onClickEvent={sendCreditData}
            />
            <AnimationButton
              buttonValue={'back'}
              onClickEvent={() => setPaymentMethod('')}
            />
          </div>
          <div className="payment-rule-container">
            <h3
              style={{ color: 'red', textAlign: 'center', marginTop: '30px' }}
            >
              信用情報規約
            </h3>
            <div style={{ border: 'solid' }}>
              <div style={{ margin: '20px' }}>
                クレジット（信用販売）規約（案） 第1条（目的）
                本規約は、当社が提供する商品またはサービスの購入に際し、利用者に対して信用販売（以下「本クレジットサービス」といいます）を提供する条件を定めるものとします。
                ⸻ 第2条（定義） 1.
                「利用者」とは、本規約に同意の上、本クレジットサービスを利用する個人または法人をいいます。
                2.
                「売買契約」とは、利用者と当社との間で成立する商品またはサービスの購入契約をいいます。
                3.
                「利用限度額」とは、当社が利用者に対して設定する、本クレジットサービスの利用可能上限金額をいいます。
                ⸻ 第3条（利用申込みおよび承諾） 1.
                利用者は、本規約に同意のうえ、当社所定の方法により本クレジットサービスの利用を申し込むものとします。
                2. 当社は、当社所定の審査基準に基づき、利用の可否を判断します。
                3.
                当社は、審査の結果、利用を承諾しない場合があります。この場合、理由を開示する義務を負いません。
                ⸻ 第4条（利用限度額） 1.
                当社は、利用者ごとに利用限度額を設定します。 2.
                利用者は、利用限度額の範囲内で本クレジットサービスを利用できるものとします。
                3.
                当社は、利用者の信用状況等に応じて、利用限度額を変更できるものとします。
                ⸻ 第5条（支払方法および支払期日） 1.
                利用者は、売買契約に基づく代金を、当社が指定する支払方法により支払うものとします。
                2. 支払期日は、商品またはサービスごとに当社が定める日とします。
                3.
                分割払いを選択した場合、利用者は、当社が定める分割回数および支払条件に従うものとします。
                ⸻ 第6条（遅延損害金） 1.
                利用者が支払期日までに支払いを行わなかった場合、支払期日の翌日から完済に至るまで、年14.6％（または法定利率）の割合による遅延損害金を支払うものとします。
                2.
                遅延が発生した場合、当社は期限の利益を喪失させ、残額の一括請求を行うことができます。
                ⸻ 第7条（禁止事項） 利用者は、以下の行為を行ってはなりません。
                1. 虚偽情報の登録 2. 第三者への名義貸し 3.
                不正利用または不正取得 4. 法令または公序良俗に反する行為 ⸻
                第8条（契約の解除） 1.
                利用者が本規約に違反した場合、当社は通知なく本クレジットサービスの利用を停止または契約を解除できます。
                2. 契約解除後も、既に発生している支払義務は消滅しません。 ⸻
                第9条（個人情報の取扱い）
                当社は、利用者の個人情報を、別途定めるプライバシーポリシーに従って適切に取り扱います。
                ⸻ 第10条（規約の変更） 1.
                当社は、必要に応じて本規約を変更できるものとします。 2.
                変更後の規約は、当社ウェブサイト上に掲載した時点で効力を生じます。
                ⸻ 第11条（準拠法・管轄） 1. 本規約は日本法に準拠します。 2.
                本規約に関して生じた紛争については、当社所在地を管轄する裁判所を第一審の専属的合意管轄とします。
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
