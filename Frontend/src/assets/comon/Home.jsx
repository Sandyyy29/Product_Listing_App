import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import { use } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [Search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState('');
  const uniqueCategories = [...new Set(category)];
 


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(Search);
    }, 700);
    return () => clearTimeout(timer);
  }, [Search]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products", {
      params: {
        category,
        search: debouncedSearch,
        page,
        sort: sort || ''
      }
    })
      .then((res) => {
        setProducts(res.data.data);
        setLastPage(res.data.meta?.last_page || res.data.last_page);
      })
      .catch((err) => {
        console.log(err);
      })

  }, [category, debouncedSearch, page, sort])
  useEffect(() => {
    if (debouncedSearch) {
      setCategory("");
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (category) {
      setSearch("");
    }
  }, [category])

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      alert("Item already added ");
      return;
    }
    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

  };
  return (
    <div>
      <>
        <header className='header'>
          <input type="text" className="search" placeholder='Search products...' value={Search} onChange={(e) => setSearch(e.target.value)} />
        </header>
        <div className='card'>

          <div className='Category'>
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort</option>
              <option value="low">Price Low to High</option>
              <option value="high">Price High to Low</option>
            </select>
            <select onChange={(e) => setCategory(e.target.value)}>
              
              <option value="">All</option>
              {uniqueCategories.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))} 
            </select>

          </div>
          <div className='card_details'>
            {products.map((item) => (
              <div key={item.id} className='product'>
                <Link to={`products/${item.id}`}>
                  <img src={`${item.image_url}`} width={150} /></Link>
                <h1>{item.name}</h1>
                <h1>{item.price}</h1>
                <h5>{item.description}</h5>
                <button className='btn' onClick={() => addToCart(item)}>Add To Cart</button>
              </div>
            ))}

          </div>
          <div className="prev">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} >
              Prev
            </button>
            <span> Page {page} </span>
            <button
              disabled={page === lastPage}
              onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </div>

      </>

    </div >
  )
}

export default Home
