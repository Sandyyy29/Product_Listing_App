import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './App.css'; 

const Address = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    pincode: '',
    city: '',
    state: '',
    address: '',
    type: 'Home'
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(data);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * (item.cartQuantity || 1)), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const res = await axios.post('http://127.0.0.1:8000/api/addresses', formData);
      if (res.status === 201) {
        alert("Address Saved!");
        navigate('/payment'); 
      }
    } catch (err) {
      console.error("Backend Error:", err.response?.data);
      alert("Error saving address. Check console.");
    }
  };

  return (
    <div className="checkout-bg">
      <Navbar />
      
    
      <div className="checkout-stepper">
        <div className="step done">Cart</div>
        <div className="line active"></div>
        <div className="step active">Delivery Address</div>
        <div className="line"></div>
        <div className="step">Payment</div>
      </div>

      <div className="checkout-content">
        
        <div className="address-section">
          <div className="card-header">
            <h3>ADD NEW ADDRESS</h3>
          </div>
          <form className="address-form" onSubmit={handleSubmit}>
            <div className="row">
              <input type="text" name="full_name" placeholder="Name" onChange={handleChange} required />
              <input type="text" name="phone" placeholder="10-digit mobile" onChange={handleChange} required />
            </div>
            <div className="row">
              <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />
              <input type="text" name="city" placeholder="City/District/Town" onChange={handleChange} required />
             
            </div>
            <div className="full-row">
              <textarea name="address" placeholder="Address (Area and Street)" rows="3" onChange={handleChange} required></textarea>
            </div>
            <div className="address-type">
              <p>Address Type</p>
              <div className="type-buttons">
                <button type="button" className={formData.type === 'Home' ? 'selected' : ''} onClick={() => setFormData({...formData, type:'Home'})}>Home</button>
                <button type="button" className={formData.type === 'Work' ? 'selected' : ''} onClick={() => setFormData({...formData, type:'Work'})}>Work</button>
              </div>
            </div>
            <button type="submit" className="deliver-btn">SAVE AND DELIVER HERE</button>
          </form>
        </div>

        <div className="checkout-summary">
          <h4 className="summary-title">PRICE DETAILS</h4>
          <hr />
          <div className="price-item">
            <span>Price ({cartItems.length} items)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="price-item">
            <span>Delivery Charges</span>
            <span className="free">FREE</span>
          </div>
          <hr className="dashed" />
          <div className="price-item total">
            <span>Total Amount</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <p className="savings-text">You will save ₹{ (subtotal * 0.1).toLocaleString() } on this order</p>
        </div>
      </div>
    </div>
  );
};

export default Address;