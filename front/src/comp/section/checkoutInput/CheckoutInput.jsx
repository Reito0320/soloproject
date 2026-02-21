import { useState } from 'react';
import { Input } from '../../atoms/input/Input';
import './CheckoutInput.css';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const CheckoutInput = () => {
  const [checkoutData, setCheckOutData] = useState({});

  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem('authData'));
  const inputFunc = (inputSection, e) => {
    setCheckOutData((prev) => ({
      ...prev,
      [inputSection]: e.target.value,
    }));
  };

  const nextRenderPage = () => {
    if (Object.keys(checkoutData).length !== 6)
      return toast.error('入力が完了していません。');

    toast.success('入力が完了しました。');
    setTimeout(() => {
      navigate('/checkout/credit');
    }, 1500);
  };

  return (
    <>
      <ToastContainer autoClose={0} />
      <div className="checkoutinput-section">
        <p>
          <Input
            inputType={'text'}
            onChangeFunc={(e) => inputFunc('name', e)}
            inputTitle={'Your Name'}
            placeHolder={authData.userName}
          />
        </p>
        <p className="checkoutinput-tell-container">
          <Input
            className={'checkoutinput-tell-input'}
            inputTitle={'Your Tell'}
            placeHolder={'000'}
            onChangeFunc={(e) => inputFunc('tellFirst', e)}
          />
          <Input
            onChangeFunc={(e) => inputFunc('tellSecond', e)}
            className={'checkoutinput-tell-input'}
            placeHolder={'8888'}
          />
          <Input
            onChangeFunc={(e) => inputFunc('tellThird', e)}
            className={'checkoutinput-tell-input'}
            placeHolder={'9999'}
          />
        </p>
        <p>
          <Input
            inputType={'text'}
            onChangeFunc={(e) => inputFunc('mail', e)}
            inputTitle={'Your Mail'}
            placeHolder={'scissors@email'}
          />
        </p>
        <p>
          <Input
            inputType={'text'}
            onChangeFunc={(e) => inputFunc('address', e)}
            inputTitle={'Your address'}
            placeHolder={'東京都港区元麻布３丁目１−３５ B2F'}
          />
        </p>
        <p>
          <AnimationButton
            className="checkoutinput-button"
            onClickEvent={nextRenderPage}
            buttonValue={'next'}
          />
        </p>
      </div>
    </>
  );
};
