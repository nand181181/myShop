
import './App.css';
import "./index.css";
//import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment";
//import ProtectedRoute from "./component/ProtectedRoute"; //
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './pages/Home';
import Mobile from './pages/Mobile';
//import Fashion from './pages/Fashion';
import Electronics from './pages/Electronics';
import Api from './pages/Api';
import ProductList from './pages/ProductList';
import ProductDetails from "./pages/ProductDetails";
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import WishList from './pages/WishList';
import Signup from './pages/Signup';
import React, { Suspense, lazy } from "react";
const Fashion = lazy(() => import("./pages/Fashion"));  // your path


function App() {
 //const { t } = useTranslation();
  return (
    <>
      <BrowserRouter>
        <div class="header">
          <div class="container">
              <Suspense fallback={<h3 className="text-center mt-5">Loading...</h3>}></Suspense>
           <Navbar />
          </div>
        </div>
        {/* <div class="container mt-4 mb-1 text-end">
         <span className="text-light me-2">👋 {user?.name}</span>
        </div>    */}
        <div class="container minHeight shadow rounded border-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Mobile" element={<Mobile />} />
            <Route path="Fashion" element={<Fashion />} />
            <Route path="Electronics" element={<Electronics />} />
             <Route path="Api" element={<Api />} />
            <Route path="ProductList" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/WishList" element={<WishList />} />
            <Route path="Login/Signup" element={<Signup />} />
            <Route path="Login" element={<Login />} />
          </Routes>

        </div>
        <div class="footer-stip1">
          <div class='container text-center text-light p-2 '>
            © 2025 Company, Inc. All rights reserved.
          </div>
        </div>

        <div class="footerBG">
          <div class='container'>
            <Footer />
          </div>
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
