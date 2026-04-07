import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(`http://127.0.0.1:8000/storage/${res.data.main_image}`);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(i => i.id === item.id);
    if (exists) {
      alert("Item is already in cart");
      return;
    }
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added To Cart");
  };

  if (!product) return <div className="loader">Loading Product...</div>;

  return (
    <div>
      <Navbar />
      <div className='product_details_container'>
        
        <div className='image_section'>
          <img src={mainImage} alt={product.name} className="main_display_img" />
          
      
          <div className='thumbnail_row'>
            <img 
              src={`http://127.0.0.1:8000/storage/${product.main_image}`} 
              onClick={() => setMainImage(`http://127.0.0.1:8000/storage/${product.main_image}`)}
              className="thumb_img"
            />
            {product.gallery_images?.map((img, index) => (
              <img 
                key={index}
                src={`http://127.0.0.1:8000/storage/${img}`} 
                onClick={() => setMainImage(`http://127.0.0.1:8000/storage/${img}`)}
                className="thumb_img"
              />
            ))}
          </div>
        </div>

        <div className='info_section'>
          <p className="brand_name">{product.brand}</p>
          <h1 className="product_title">{product.name}</h1>
          
          <div className="price_row">
            <span className="current_price">₹{product.price}</span>
            {product.original_price && (
              <>
                <span className="old_price">₹{product.original_price}</span>
                <span className="discount_badge">
                  {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="stock_status">
            {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
          </p>

          <h5>Description</h5>
          <p className='desc_text'>{product.description}</p>

          <h5>Specifications</h5>
          <ul className='spec_list'>
            {product.specifications?.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>

          <button 
            className='add_to_cart_btn' 
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            {product.stock > 0 ? "Add To Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;