import { useState } from "react";
import API from "../../api";

export default function AdminLogin(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit=async()=>{
    const res=await API.post("/admin-login",{email,password});

    localStorage.setItem("token",res.data.token);
    localStorage.setItem("role","admin");

    window.location="/AddProduct";
  };

  return(
    <>
      <input onChange={(e)=>setEmail(e.target.value)} placeholder="Admin Email"/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
      <button onClick={submit}>Admin Login</button>
    </>
  )
}