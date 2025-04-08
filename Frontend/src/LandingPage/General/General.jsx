import React from 'react';
import { useNavigate } from 'react-router-dom';
import './general.css'; 

function General() {
  const navigate = useNavigate();

  return (
    <section className="general-section">
      <div className="general-content">
        <h1>WELCOME TO F PLANNER</h1>
        <p>A simple and efficient way to manage client requests between Financial Planners and Mortgage Brokers.</p>
        <button className="login-button-general" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </section>
  );
}

export default General;
