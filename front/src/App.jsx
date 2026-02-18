import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './comp/mainPage/home/Home';
import { Header } from './comp/mainPage/header/Header';
import { Shopping } from './comp/mainPage/shopping/Shopping';
import { ShoppingItem } from './comp/mainPage/shoppingItem/ShoppingItem';
import { Login } from './comp/mainPage/login/Login';
import { Logout } from './comp/mainPage/logout/Logout';
import { Cart } from './comp/mainPage/cart/Cart';

function App() {
  // const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useState(() => {
    setTimeout(() => {
      // setLoading(true);
    }, 3000);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shopping" element={<Shopping />}></Route>
        <Route
          path="/shopping/004"
          element={
            <ShoppingItem
              price={21000}
              itemTitle={'Number004'}
              pictureSrc={'../../../../public/004.jpg'}
            />
          }
        ></Route>
        <Route
          path="/shopping/005"
          element={
            <ShoppingItem
              price={35000}
              itemTitle={'Number005'}
              pictureSrc={'../../../../public/005.jpg'}
            />
          }
        ></Route>
        <Route
          path="/shopping/008"
          element={
            <ShoppingItem
              price={5000}
              itemTitle={'Number008'}
              pictureSrc={'../../../../public/008.jpg'}
            />
          }
        ></Route>
        <Route
          path="/shopping/009"
          element={
            <ShoppingItem
              price={2000}
              itemTitle={'Number009 '}
              pictureSrc={'../../../../public/009.jpg'}
            />
          }
        ></Route>
        <Route
          path="/shopping/002"
          element={
            <ShoppingItem
              price={30000}
              itemTitle={'Number002 '}
              pictureSrc={'../../../../public/002.jpg'}
            />
          }
        ></Route>
        <Route
          path="/shopping/003"
          element={
            <ShoppingItem
              price={12000}
              itemTitle={'Number003 '}
              pictureSrc={'../../../../public/003.jpg'}
            />
          }
        ></Route>

        <Route
          path="/login"
          element={<Login setIsLogin={setIsLogin} />}
        ></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </>
  );
}

export default App;
