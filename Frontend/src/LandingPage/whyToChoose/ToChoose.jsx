import React from 'react';
import './toChoose.css'; 

function ToChoose() {
  return (
    <section className="why-choose-us-section" id="why">
      <div className="why-choose-us-inner">
        <h2>Why Choose Us?</h2>
        <ul className="features-list">
          <li>
            <h3>User-Friendly Interface</h3>
            <p>Simple and easy to navigate.</p>
          </li>
          <li>
            <h3>Secure & Reliable</h3>
            <p>Ensuring data privacy and security.</p>
          </li>
          <li>
            <h3>Time-Saving</h3>
            <p>Quick ticket creation and assignment.</p>
          </li>
        </ul>
      </div>  
    </section>
  );
}

export default ToChoose;
