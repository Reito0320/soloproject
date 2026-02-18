import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Home } from './comp/mainPage/home/Home';
import { Header } from './comp/mainPage/header/Header';
import { Shopping } from './comp/mainPage/shopping/Shopping';
import { ShoppingNumberFour } from './comp/mainPage/shoppingList/shoppingNumberFour/ShoppingNumberFour';
import { Login } from './comp/mainPage/login/Login';
import { Logout } from './comp/mainPage/logout/Logout';

function App() {
  // const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useState(() => {
    setTimeout(() => {
      // setLoading(true);
    }, 3000);
  }, []);

  return (
    <>
      {localStorage.getItem('isAuth') && <Header />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shopping" element={<Shopping />}></Route>
        <Route path="/shopping/004" element={<ShoppingNumberFour />}></Route>
        <Route
          path="/login"
          element={<Login userData={userData} setUserData={setUserData} />}
        ></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </>
  );
}

export default App;
