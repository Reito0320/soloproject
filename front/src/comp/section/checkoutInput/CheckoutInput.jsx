import { useEffect, useState } from 'react';
import { Input } from '../../atoms/input/Input';
import './CheckoutInput.css';
import { AnimationButton } from '../../atoms/button/AnimationButton';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

/* payment使うかどうかわからん */
export const CheckoutInput = ({ cartData, paymentData, sumPrice }) => {
  const [checkoutData, setCheckOutData] = useState({});
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem('authData'));

  const postOrdersTable = async () => {
    const nowTimeStamp = new Date();
    const orderData = JSON.stringify({
      userId: authData.userId,
      orderDate: nowTimeStamp,
      total: sumPrice,
    });
    await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: orderData,
    });

    const orderItemData = JSON.stringify({
      orderData: nowTimeStamp,
      cartData,
    });
    await fetch('/api/orderItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: orderItemData,
    });
  };

  const patchStock = async () => {
    const userId = JSON.parse(localStorage.getItem('authData')).userId;
    await fetch('/api/checkout/' + userId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  /* cartItemsのcolumnの削除とlocalDataの削除 */
  const deleteCartItemsTable = async () => {
    const userId = JSON.parse(localStorage.getItem('authData')).userId;
    await fetch('/api/checkout/' + userId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    localStorage.removeItem('checkoutData');
  };

  const lastQuestion = () => {
    const answer = window.confirm('購入を確定してよろしいですか？');
    if (answer) {
      postOrdersTable();
      patchStock();
      deleteCartItemsTable();
      toast.success(
        'ご注文ありがとうございます。詳細をmailにて送らせていただきました。',
      );
      setTimeout(() => {
        navigate('/');
        location.reload();
      }, 2000);
    }
  };

  /* credit情報を取得したけど、どこで使うの問題？ */
  // useEffect(() => {
  //   const getCreditData = async () => {
  //     const response = await fetch('/api/paymentMethods/credit');
  //     const message = await response.json();
  //   };
  //   getCreditData();
  // }, [paymentData]);

  /* それぞれのinputの情報をobject管理 */
  const inputFunc = (inputSection, e) => {
    /* テクニックコード */
    setCheckOutData((prev) => ({
      ...prev,
      [inputSection]: e.target.value,
    }));
  };

  const nextRenderPage = () => {
    if (Object.keys(checkoutData).length !== 6)
      return toast.error('入力が完了していません。');

    const newData = {
      name: checkoutData.name,
      mail: checkoutData.mail,
      tell: `${checkoutData.tellFirst}-${checkoutData.tellSecond}-${checkoutData.tellThird}`,
      address: checkoutData.address,
    };
    /* データを保存して次回からは自動で表示 */
    localStorage.setItem('checkoutData', JSON.stringify(newData));
    navigate('/checkOut/paymentMethod');
  };

  return (
    <>
      <ToastContainer autoClose={0} />
      {/* すでにcheckoutDataを入力していたら省略 */}
      {localStorage.getItem('checkoutData') ? (
        <div className="checkoutinput-main">
          <div className="re-checkoutinput">
            {Object.keys(JSON.parse(localStorage.getItem('checkoutData'))).map(
              (key, index) => (
                <p style={{ fontWeight: 'bold' }} key={index}>
                  {`${key}: ${JSON.parse(localStorage.getItem('checkoutData'))[key]}`}
                </p>
              ),
            )}
          </div>
          <div className="checkout-button-container">
            <AnimationButton
              className="checkoutinput-button"
              onClickEvent={lastQuestion}
              buttonValue={'done'}
            />
            <AnimationButton
              className="checkoutinput-button"
              onClickEvent={() => navigate('/checkOut/paymentMethod')}
              buttonValue={'back'}
            />
          </div>
        </div>
      ) : (
        /* checkoutDataの入力が初回だったら */
        <div className="checkoutinput-main">
          <div className="checkoutinput-section">
            <p>
              <Input
                inputType={'text'}
                onChangeFunc={(e) => inputFunc('name', e)}
                inputTitle={'Name'}
                placeHolder={authData.userName}
              />
            </p>
            <p className="checkoutinput-tell-container">
              <Input
                className={'checkoutinput-tell-input'}
                inputTitle={'Tell'}
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
                inputTitle={'Mail'}
                placeHolder={'scissors@email'}
              />
            </p>
            <p>
              <Input
                inputType={'text'}
                onChangeFunc={(e) => inputFunc('address', e)}
                inputTitle={'address'}
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
        </div>
      )}
    </>
  );
};
