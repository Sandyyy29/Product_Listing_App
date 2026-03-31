import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css'

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
 

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  return (
    <div className='navbar' >
      <Link to={'/'} className='no-link'> <h1>My Store</h1> </Link>
      <Link to={"/AddProduct"} className='no-link'><h1>AddProduct</h1></Link>
      <Link to={'/cart'} className='no-link'>
        <h1 > Cart 🛒 ({cartCount})</h1>
      </Link>
    </div>
  );
};

export default Navbar;