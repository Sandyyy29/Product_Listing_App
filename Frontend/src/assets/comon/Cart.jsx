import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));
  };
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
const total = cart.reduce(
  (sum, item) => sum + Number(item.price),
  0
);
   
  return (
    <>
      <Navbar />
      <Link to={'/'}><h1>Home</h1></Link><h1>My Cart</h1>
      <div className='cart_main'>
       <div className='shop'> 
        <h3>Order Summary</h3>
        <p>Subtotal({cartCount} item)</p> <p>{total}</p>
        <p>Delivery Charges</p>
      </div>
      <h3>Shoping Bag ({cartCount} item)</h3>
      <div className='cart_details'>
        
      {cart.map((item) => (
        <div key={item.id} className='Cart'>
          <Link to ={`/products/${item.id}`}>
         <img src={`http://127.0.0.1:8000/storage/${item.main_image}`} width={150}/></Link>
          <div className='details'>
          <h3>{item.name}</h3>
          <h6>{item.brand}</h6>
          <h2>₹ {item.price}</h2>
          <p> {item.stock > 0 ? ` IN Stock ` : "Out of Stock"}</p>
          <button onClick={() => removeItem(item.id)}>
           <i class="bi bi-trash"></i> Remove
          </button>
          </div>
        </div>
      ))}
      

   
      </div>
    </div>
    </>
  );
};

export default Cart;