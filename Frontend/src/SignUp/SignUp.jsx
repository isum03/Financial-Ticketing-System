import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import Footer from '../Headers, Footer/Footer';
import { authService } from '../services/auth';

function SignUp() {
  const navigate = useNavigate();
  //use for storing form data in inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    roleId: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  //handle changes in the input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  //handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      //prepare user data
      const userData = {
        ...formData,
        roleId: parseInt(formData.roleId) // Ensure roleId is a number
      };

      const response = await authService.signup(userData);
      
      // Handle successful registration
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <h4 className="signup-subtitle">Create a account</h4>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-input form-input-half"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-input form-input-half"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="email@domain.com"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
          />

          <select
            name="roleId"
            className="form-input form-select"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Choose your role</option>
            <option value="1">Admin</option>
            <option value="2">Financial Planner</option>
            <option value="3">Mortgage Broker</option>
          </select>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-input"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;