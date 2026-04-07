import React from "react"
import {BrowserRouter, Routes, Route, } from 'react-router-dom'
import Home from "./assets/comon/Home"
import Product from "./assets/comon/Product"
import Cart from "./assets/comon/Cart"
import AddProduct from './assets/comon/AddProduct'
import Login from "./assets/comon/Login"  
import Register from "./assets/comon/Register"
import Profile from "./assets/comon/profile"



function App() {
  
  return (



<>   
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
</>
  )
}

export default App
  
