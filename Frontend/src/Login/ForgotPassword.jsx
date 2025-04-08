import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import './forgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess('Password reset instructions have been sent to your email.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="form-card">
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Login to your account</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="input-label">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Value"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>

        <button className="back-link" onClick={() => navigate('/login')}>
          ← Back to login
        </button>
      </div>
      
    </div>
  );
}

export default ForgotPassword;
