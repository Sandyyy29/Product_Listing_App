import React, { use } from 'react'        
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  './App.css'
import { Link } from 'react-router-dom';
const Product = () => {
  const [product, setProduct] = useState([]);
  const { id }=useParams();
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/product/${id}`
      ).then((res)=>
    {
      setProduct(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[id]);
    const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
const exists = cart.find(item => item.id === product.id);
  if (exists) {
    alert("Item is already added ");
    return;
  }
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated")); 
  alert("Added To Cart");
};

  return (
   <div>
    
   <Link to={'/'}> <h1>Home</h1> </Link>
    <div className='product_details'>
       <img src={`${product.image_url}`} width={150}/>
       <div className='description'>
       <h5>{product.description}</h5>
      <div key={product.id} className='product1'>
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
        <button className='btn' onClick={()=>addToCart(product)}>Add To Cart</button>
        </div>
      </div>
  </div>
   </div>
  )
}

export default Product
