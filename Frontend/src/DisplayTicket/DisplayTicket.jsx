import React, { useState, useEffect } from 'react';
import './DisplayTicket.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ticketService } from '../services/ticketService';
import Footer from '../Headers, Footer/Footer';

const DisplayTicket = () => {
  const navigate = useNavigate();
  const { id } = useParams();       //extract tickets from the id

  const [ticket, setTicket] = useState(null);  //ticket state
  const [loading, setLoading] = useState(true); //loading indicator
  const [error, setError] = useState('');  //error state
  //fetch the ticket details using the id
  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const data = await ticketService.getTicketById(id); //call api to fetch ticket id
        setTicket(data.ticket); //set ticket data 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    //only fetch the id is present
    if (id) fetchTicketDetails();
  }, [id]);
  //render ticket fields in raw
  const DetailRow = ({ label, value }) => (
    <div className="ticket-detail-row">
      <span className="ticket-label">{label}:</span>
      <span className="ticket-value">{value}</span>
    </div>
  );

  if (loading) return (
    <div className="page-wrapper">
      <div className="status-message">Loading...</div>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="page-wrapper">
      <div className="error-message">{error}</div>
      <Footer />
    </div>
  );
  //if no ticket found
  if (!ticket) return (
    <div className="page-wrapper">
      <div className="status-message">No ticket found</div>
      <Footer />
    </div>
  );

  return (
    <div className="page-wrapper">
      <section className="display-ticket-container">
        <h1 className="display-title">Ticket Details</h1>

        <section className="ticket-details">
          <DetailRow label="Serial Number" value={ticket.serial_no} />
          <DetailRow label="Client Name" value={ticket.client_name} />
          <DetailRow label="Client Address" value={ticket.client_address} />

          <h3 className="section-heading-create">Contact Details</h3>
          <DetailRow label="Email" value={ticket.email} />
          <DetailRow label="Phone Number" value={ticket.phone_number} />
          <DetailRow label="Amount" value={`$${parseFloat(ticket.amount).toLocaleString()}`} />
          <DetailRow label="Status" value={ticket.status} />
          <DetailRow label="Created At" value={new Date(ticket.created_at).toLocaleString()} />
        </section>
      </section>
      <button className="goBack-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <Footer />
    </div>
  );
};

export default DisplayTicket;
