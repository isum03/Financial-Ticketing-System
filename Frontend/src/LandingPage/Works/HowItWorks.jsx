import React from 'react';
import './howItWorks.css'; 

function HowItWorks() {
  return (
    <section className="how-it-works-section" id="howitwork">
      <h2 className="section-title">How It Works</h2>
      <div className="how-it-works-content">
      
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Admin Registration</h3>
          <p>Admin creates user accounts for Financial Planners and Mortgage Brokers.</p>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Ticket Creation</h3>
          <p>Financial Planners and Mortgage Brokers create client-related tickets.</p>
        </div>

      
        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Ticket Submission & Tracking</h3>
          <p>Tickets are assigned to the relevant user for processing.</p>
        </div>
      </div>

    
    </section>
  );
}

export default HowItWorks;
