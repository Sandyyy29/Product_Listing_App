import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


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
      <Link to={'/Home'} id='mystore'><img src='/images/logo.png'  width={'200px'}/></Link>
      <div className='no-link'>
      <Link to={'/cart'} className='link'>
      Cart🛒({cartCount})
      </Link>
      <Link to={'/profile'} className='link'> <i class="bi bi-person-circle"> </i> </Link>
    </div>
    </div>
  )
}

export default Navbar;