import React from 'react';
import './keyFeature.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faTicketAlt, faUsers } from "@fortawesome/free-solid-svg-icons";

// Add icons to library
library.add(faLock, faTicketAlt, faUsers);

function KeyFeatures() {
  return (
    <section className="key-features-section" id="keyfeature">
      <div className="stack-area">
        <div className="left">
          <h2 className="title">
            Key Features 
          </h2>
          <p className="sub-title">
            We offer a seamless and secure experience for both financial planners and mortgage brokers.
          </p>
        </div>

        <div className="right">
          <div className="card">
            <div className="icon-container">
              <FontAwesomeIcon className="feature-icon" icon="lock" />
              <div className="connecting-line"></div>
            </div>
            <div className="sub">Secure User Access</div>
            <div className="content">
              Role-based login for Admins, Financial Planners, and Mortgage Brokers.
            </div>
          </div>

          <div className="card">
            <div className="icon-container">
              <FontAwesomeIcon className="feature-icon" icon="ticket-alt" />
              <div className="connecting-line"></div>
            </div>
            <div className="sub">Seamless Ticket Management</div>
            <div className="content">
              Create, assign, and track tickets effortlessly for a smooth workflow.
            </div>
          </div>

          <div className="card">
            <div className="icon-container">
              <FontAwesomeIcon className="feature-icon" icon="users" />
              <div className="connecting-line"></div>
            </div>
            <div className="sub">Efficient Collaboration</div>
            <div className="content">
              Smooth collaboration between Financial Planners and Mortgage Brokers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeyFeatures;
