import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { motion } from 'motion/react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { useNavigate } from 'react-router-dom';
import './PaymentMethod.css';
import { ToastContainer, toast } from 'react-toastify';

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
          />
          <AnimationButton
            buttonValue={'credit card'}
            onClickEvent={() => setPaymentMethod('credit')}
          />
          <AnimationButton buttonValue={'cash on'} />
        </div>
      )}
      {paymentMethod === 'bank' && (
        <div className="credit-bank-page">
          <h2>bank</h2>
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
            <h3 style={{ color: 'red' }}>信用情報規約</h3>
          </div>
        </div>
      )}
    </>
  );
};
