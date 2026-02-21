import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './comp/mainPage/home/Home';
import { Header } from './comp/mainPage/header/Header';
import { Shopping } from './comp/mainPage/shopping/Shopping';
import { ShoppingItem } from './comp/mainPage/shoppingItem/ShoppingItem';
import { Login } from './comp/mainPage/login/Login';
import { Logout } from './comp/mainPage/logout/Logout';
import { Cart } from './comp/mainPage/cart/Cart';
import { CheckOut } from './comp/mainPage/checkout/CheckOut';
import { Credit } from './comp/mainPage/credit/Credit';

function App() {
  /* 待機画面のアニメーションのためのstate */
  const [isLoading, setIsLoading] = useState(false);
  /* ログインしているしていないかのstate */
  /* ログイン処理をするのはlogin compと logout compなのでそこに送る */
  /* uiの所在はheaderなので、stateはheaderへ */
  const [isLogin, setIsLogin] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);

  /* 目標 */
  /* 待機画面のアニメーション実装 */
  /* お問い合わせsectionの修正 */
  /* DBのデータを使ってcart compのUIを作成する */

  useEffect(() => {
    const gatInitialData = async () => {
      try {
        const response = await fetch('/api/products');
        const result = await response.json();
        setProductsData(result);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    gatInitialData();

    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/shopping"
          element={<Shopping productsData={productsData} />}
        ></Route>
        {/* こここだわりポイント */}
        {productsData.map((obj, index) => {
          return (
            <Route
              key={index}
              path={`/shopping/${obj.path}`}
              element={
                <ShoppingItem
                  price={obj.price}
                  itemTitle={obj.name}
                  pictureSrc={`/${obj.path}.jpg`}
                  stock={obj.stock}
                  products_id={obj.products_id}
                />
              }
            ></Route>
          );
        })}

        <Route
          path="/login"
          element={<Login setIsLogin={setIsLogin} />}
        ></Route>
        <Route
          path="/logout"
          element={<Logout setIsLogin={setIsLogin} />}
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              deleteFlag={deleteFlag}
              setDeleteFlag={setDeleteFlag}
              cartData={cartData}
              setCartData={setCartData}
            />
          }
        ></Route>
        <Route
          path="/checkOut"
          element={<CheckOut cartData={cartData} setCartData={setCartData} />}
        ></Route>
        <Route path="/checkOut/credit" element={<Credit />}></Route>
      </Routes>
    </>
  );
}

export default App;
