/*import { useState } from 'react'
import reactLogo from './assets/react.svg'*/
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import General from './LandingPage/General/General.jsx'
import KeyFeatures from './LandingPage/Feature/KeyFeatures.jsx'
import WhyToChoose from './LandingPage/whyToChoose/ToChoose.jsx'
import HowItWorks from './LandingPage/Works/HowItWorks.jsx'
import Header from './Headers, Footer/Header.jsx'
import Footer from './Headers, Footer/Footer.jsx'
import Login from './Login/Login.jsx'
import CreateTicketForm from './CreateTickets/CreateTicketForm.jsx'
import DisplayTicket from './DisplayTicket/DisplayTicket.jsx' 
import Register from './SignUp/SignUp.jsx' 
import Dashboard from './Dashboard/Dashboard';
import LogView from './LogView/LogView.jsx' 
import ForgotPassword from './Login/ForgotPassword.jsx';
import { authService } from './services/auth.jsx';

import './App.css'
import './LandingPage/Feature/keyFeature.css'
import './LandingPage/whyToChoose/toChoose.css'
import './LandingPage/Works/howItWorks.css'
import './LandingPage/General/general.css'
import './Headers, Footer/Header.css'
import './Headers, Footer/Footer.css'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <General />
              <KeyFeatures />
              <WhyToChoose />
              <HowItWorks />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-ticket" element={<CreateTicketForm />} />
          <Route path="/display-ticket" element={<DisplayTicket />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ticket-logs" element={<LogView />} />
          <Route path="/display-ticket/:id" element={<DisplayTicket />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App
