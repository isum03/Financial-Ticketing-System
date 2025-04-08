import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Import component-specific styles

function Header() {
  const navigate = useNavigate();
  //handle guiding to a new path
  const handleNavClick = (event) => {
    event.preventDefault();  
    const target = event.target.getAttribute('href');       // Get the target from the href attribute to scroll to the correct section
    document.querySelector(target).scrollIntoView({ 
      behavior: 'smooth'  //smooth scrolling effect
    });
  };

  return (
    <header className="app-header"> 
      <div className="header-logo">FPLANNER</div> 
      <nav className="header-nav">
        <ul>
        <li><a href="#keyfeature" onClick={handleNavClick}>Key-Features</a></li>
          <li><a href="#howitwork" onClick={handleNavClick}>How</a></li>
          <li><a href="#why" onClick={handleNavClick}>Why</a></li>
        </ul>
      </nav>
      <button className="header-login-button" onClick={() => navigate('/login')}>Login</button>
    </header>
  );
}

export default Header;