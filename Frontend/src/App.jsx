import React from "react"
import {BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from "./assets/comon/Home"
import Product from "./assets/comon/Product"
import Cart from "./assets/comon/Cart"
import Navbar from "./assets/comon/Navbar"
import AddProduct from './assets/comon/AddProduct'
import Login from "./assets/comon/Login"  
import Register from "./assets/comon/Register"
import AdminLogin from "./assets/comon/AdminLogin"
import Profile from "./assets/comon/Profile"



function AppContent() {
  const location = useLocation();

 
  const hideNavbar = ["/", "/register", "/admin-login"];

  return (
    <>
  
      {!hideNavbar.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/home" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
