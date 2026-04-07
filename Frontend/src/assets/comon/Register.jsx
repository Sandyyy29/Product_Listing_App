import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import './App.css';

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/register", { ...form, password_confirmation: form.password });
      localStorage.setItem("token", res.data.token);
      navigate("/Home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className='register-card'>
        <div className="brand-header">
           <h1 className="logo-text">Snap<span>Shop</span></h1>
           <p className="subtitle">Join our community of shoppers</p>
        </div>

        <div className="form-body">
          {error && <div className="error-badge">{error}</div>}

          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text"
              placeholder="Enter your name" 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email"
              placeholder='example@mail.com' 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="pass-wrapper">
              <input 
                type={showPass ? 'text' : 'password'} 
                placeholder='••••••••' 
                onChange={(e) => setForm({ ...form, password: e.target.value })} 
              />
              <span className="toggle-icon" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🔒" : "👁️"}
              </span>
            </div>
          </div>

          <button className="submit-btn" onClick={submit} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Create Account"}
          </button>
        </div>

        <p className="footer-text">
          Already a member? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}