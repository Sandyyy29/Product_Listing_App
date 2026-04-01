import { useState } from "react";
import API from "../../api";
import './App.css'

export default function Register(){
  const [form,setForm]=useState({name:"",email:"",password:""});

  const submit=async()=>{
    const res=await API.post("/register",{
      ...form,
      password_confirmation:form.password
    });

    localStorage.setItem("token",res.data.token);
    window.location="/Home";
  };

  return(
    <>
    <div className="main">
     <div className='page'>
     <div className='login-page'>
       <h2>Registeration Page</h2>
       <label id="name">Name</label>
       <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <label id='Email'>Email</label>
      <input  placeholder='Enter your Email' onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <label id='pass'>Password</label>
      <input type='password'onChange={(e)=>setForm({...form,password:e.target.value})} placeholder='Enter your Password' />
      
      <div className='btn'>
      <button onClick={submit}>create</button>
    </div>
    </div>
    </div>
    </div>
    
    //   <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
    //   <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
    //   <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
    //   <button onClick={submit}>Register</button>
    // </>
  )
}