const express = require('express');  //import express module
const router = express.Router();
const auth = require('../middleware/auth');  //import auth middleware
const roleCheck = require('../middleware/roleCheck');   //import roleCheck middleware
//validateTicket, validateTicketAssignment, validateTicketResponse
const { 
    validateTicket, 
    validateTicketAssignment,
    validateTicketResponse
} = require('../middleware/validate');
//ticket controller methods
const { 
    createTicket,
    getBrokerTickets, 
    getTicketById  
} = require('../controllers/ticketController');

// Create ticket (both planners and brokers)
router.post('/', 
    auth, 
    roleCheck(['planner', 'broker']),
    validateTicket, 
    createTicket
);
// Get tickets assigned to a broker
router.get('/broker-tickets', 
    auth,
    roleCheck(['broker']),
    getBrokerTickets 
);
// Add new route for getting specific ticket
router.get('/:serialNo', auth, getTicketById);

module.exports = router;