import { useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";
import './App.css'


export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit=async()=>{
    const res=await API.post("/login",{email,password});

    localStorage.setItem("token",res.data.token);
    localStorage.setItem("role",res.data.user.role);

    if(res.data.user.role==="admin"){
      window.location="/AddProduct";
    }else{
      window.location="/home";
    }
  };

  return(
     <div className="main">
     <div className='page'>
     <div className='login-page'>
      <h2>Login Page</h2>
      <label id='email'>Email</label>
      <input onChange={(e)=>setEmail(e.target.value)}  type='email' placeholder='Enter your Email'/>
      <label id='pass'>Password</label>
      <input type='password'  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password' />
      <div className='btn'>
      <button onClick={submit}>Login</button>
      <button id ="create"><Link to={'/register'}><p id="p">create Acount</p> </Link></button>
    </div>
    </div>
    </div>
    </div>
    

    // <>
    
    //   <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
    //   <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
    //   <button onClick={submit}>Login</button>
    //   <p><Link to={'/admin-login'}>Admin</Link></p>
    //   <p>Don't have an account?<Link to={'/register'}>Register</Link></p>

    // </>
  )
}