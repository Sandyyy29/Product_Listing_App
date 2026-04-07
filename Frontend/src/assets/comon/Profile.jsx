import { useEffect, useState } from "react";
import API from "../../api";
import  './App.css'
import Navbar from './Navbar';
import Footer from './Footer'

export default function Profile() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    API.get("/user")
      .then(res => setUser(res.data))
      .catch(() => {
        window.location = "/profile"; 
      });
  }, []);


  
  
  const logout = async () => {
    try {
      await API.post("/logout");
    } catch (err) {
      console.log(err.response?.data);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location = "/";
  };



  return (
    <div>
    <Navbar />
    <div  className='profile'>
      <h1>My Profile</h1>
      <div className='profile_details'>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <button  onClick={logout}>
          Logout
        </button>
      </div>
     
    </div>
    <Footer />
     </div>
  );
}

