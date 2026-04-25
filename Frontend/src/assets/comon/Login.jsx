import { useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";
import './App.css'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);


  const submit = async () => {
    try {
      const res = await API.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") {
        window.location = "/AddProduct";
      } else {
        window.location = "/home";
      }

    } catch (err) {
  const message = err.response?.data?.message || "Login failed";
  setError(message);
}
  };
  return (
    
    <div className="main">
      <div className='page'>
       
        <div className='login-page'>
          
       
          <img src="images/logo.png" alt="SnapShop" style={{ width: '190px', margin: '0 auto 20px' }} />
              
          <h2>Welcome Back</h2>
       {error && <div className="error-badge">{error}</div>}
          <label id='email'>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter your Email' />
              <div className="input-group">
            <label>Password</label>
        
                <span className="toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🔒" : "👁️"}
              </span>
              <input 
                type={showPass ? 'text' : 'password'} 
                placeholder='••••••••' 
                onChange={(e) => setPassword(e.target.value )} 
              />
          </div>
          <div className='btn'>
            <button onClick={submit}>Sign in</button>
          </div>
          <p>Don't have an account?<Link to={'/register'}>Sign up</Link></p>
        </div>
      </div>
    </div>



  )
}