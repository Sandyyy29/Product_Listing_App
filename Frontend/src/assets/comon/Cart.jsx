import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css'; 

const Cart = () => {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.cartQuantity || 1) + delta);
        return { ...item, cartQuantity: newQty };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) * (item.cartQuantity || 1)),
    0
  );

  return (
    <div className="cart-page-bg">
      <Navbar />
      
      <div className='cart-breadcrumb'>
        <Link to="/home">Home</Link> &gt; My Cart
      </div>

      <div className='cart_main_layout'>
        

        <div className='shopping_bag_container'>
          <h2 className="section-title">Shopping Bag ({cart.length} Items)</h2>
          
          {cart.length === 0 ? (
            <div className="empty-msg">Your bag is empty. <Link to="/home">Shop Now</Link></div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className='cart_item_card'>
                <Link to={`/products/${item.id}`}>
                  <img src={`http://127.0.0.1:8000/storage/${item.main_image}`} alt={item.name} className="cart_item_img"/>
                </Link>
                
                <div className='cart_item_details'>
                  <div className="item-top-row">
                    <h3>{item.name}</h3>
                    <h4 className="item-price">₹{Number(item.price).toLocaleString()}</h4>
                  </div>
                  <h6 className="brand-label">{item.brand}</h6>
                  
                  <div className="item-actions-row">
                    <div className="qty-picker">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.cartQuantity || 1}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>

                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <i className="bi bi-trash"></i> Remove
                    </button>

                    <span className={`stock-tag ${item.stock > 0 ? 'in' : 'out'}`}>
                      {item.stock > 0 ? "● IN STOCK" : "OUT OF STOCK"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className='order_summary_sidebar'>
          <h3 className="summary-title">Order Summary</h3>
          <div className='summary-row'>
            <span>Subtotal ({cart.length} items)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className='summary-row'>
            <span>Delivery Charges</span>
            <span className="free-delivery">FREE</span>
          </div>
          <hr />
          <div className='summary-row total-row'>
            <span>Total Amount</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          
          <button className="checkout-btn" disabled={cart.length === 0}>
            PROCEED TO CHECKOUT
          </button>

          <div className="coupon-section">
            <p>Apply Coupon</p>
            <div className="coupon-input">
              <input type="text" placeholder="Enter Code" />
              <button>Apply</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;