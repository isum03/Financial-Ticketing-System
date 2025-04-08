import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Footer from '../Headers, Footer/Footer';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  //use for storing form data in inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');
  //updates the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      //send login request to backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();  //parse the JSon response

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate based on user role
      switch(data.user.role) {
        case 'planner':
          navigate('/create-ticket');
          break;
        case 'broker':
          navigate('/dashboard');
          break;
        case 'admin':
          navigate('/register');
          break;
        default:
          setError('Invalid role');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="signin-page-container">
        
        {/* Left Section: Title and Subtitle */}
        <div className="left-section">
          <h1 className="signin-title">Welcome To FPLANNER</h1>
          <p className="signin-subtitle">
            Login to your account, feel the difference.
          </p>
        </div>
  
        {/* Right Section: Login Form */}
        <div className="right-section">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
  
            <button type="submit" className="signin-button">
              Sign In
            </button>
  
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
  
}

export default Login;