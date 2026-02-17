import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Home, Login, Logout, Shopping } from './utill/import';

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
