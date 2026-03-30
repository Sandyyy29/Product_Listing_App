import React from "react"
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./assets/comon/Home"
import Product from "./assets/comon/Product"
import Cart from "./assets/comon/Cart"
import Navbar from "./assets/comon/Navbar"
import AddProduct from './assets/comon/AddProduct'



function App() {
return (
  <>
   <BrowserRouter>
   <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>

  </>

)
}

export default App
