import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import Navbar from './components/headers/Navbar';
import Newnav from './components/newnavbar/newnav'
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer'
import Signup from './components/signup_signin/SignUp'
import Sign_in from './components/signup_signin/Sign_in'
import Cart from './components/cart/Cart'
import Buynow from './components/buynow/buynow';
import { Routes, Route } from 'react-router-dom'

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])
  return (
    <>
      {
        data ? (
          <>
            <Navbar />
            <Newnav />
            <Routes>
              <Route path='/' element={<Maincomp />} />
              <Route path='/login' element={<Sign_in />} />
              <Route path='/register' element={<Signup />} />
              <Route path="/getproductsone/:id" element={<Cart />} />
              <Route path="/buynow" element={<Buynow />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )
      }

    </>
  );
}

export default App;
