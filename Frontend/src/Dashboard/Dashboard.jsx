import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Footer from "../Headers, Footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  //handle guiding to a new path
  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="page-wrapper">
      <div className="dashboard">
        <div className="content">
          {/*card create tickets*/}
          <div 
            className="cardC" 
            onClick={() => handleCardClick('/create-ticket')}
            role="button"
            tabIndex={0}
          >
            <h2>Creating Ticket</h2>
            <p>Just Click, Create a ticket for yourselves</p>
          </div>
          {/*card display tickets*/}
          <div 
            className="cardD"
            onClick={() => handleCardClick('/ticket-logs')}
            role="button"
            tabIndex={0}
          >
            <h2>Ticket Logs</h2>
            <p>View all ticket logs and their details</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;