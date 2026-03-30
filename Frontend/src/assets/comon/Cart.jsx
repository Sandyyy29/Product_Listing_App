import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);

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

  return (
    <div>
      <Link to={'/'}><h1>Home</h1></Link>
      <h1>My Cart</h1>
      <div className='cart_details'>
      {cart.map((item) => (
        <div key={item.id} className='Cart'>
          <Link to ={`/products/${item.id}`}>
         <img src={`${item.image_url}`} width={150}/></Link>
          <h3>{item.name}</h3>
          <p>₹ {item.price}</p>
          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Cart;