const db = require('../Config/db');
const { validationResult } = require('express-validator');

//generates a unique serial number for the ticket
const generateSerialNumber = () => {
    const date = new Date();
    return `TKT-${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
};

//allowing to create tickets and assign them to brokers
exports.createTicket = async (req, res) => {
    try {
        console.log('--- Create Ticket Request ---');
        console.log('User:', req.user);
        console.log('Request Body:', req.body);

        //Add validations
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation Errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        //unpack request body
        const { 
            client_name: clientName, 
            client_address: clientAddress, 
            email,
            phone_number: phoneNumber, 
            amount, 
            assigned_to: assignedTo 
        } = req.body;
        
        // Verify the assignee is an active broker
        const [brokers] = await db.execute(
            `SELECT u.user_id, u.username, r.role_name 
             FROM users u 
             JOIN roles r ON u.role_id = r.role_id 
             WHERE u.user_id = ? AND r.role_name = 'broker' AND u.is_active = 1`,
            [assignedTo]
        );

        if (brokers.length === 0) {
            return res.status(400).json({ 
                message: "Invalid assignee - User must be an active broker",
                details: "Please select a valid broker to assign this ticket"
            });
        }

        //generate a unique serial number for the ticket
        const serialNo = generateSerialNumber();
        console.log('Generated Serial Number:', serialNo);

        // Modified query to set status as pending by default
        const query = `INSERT INTO ticket (
            serial_no, client_name, client_address, email, phone_number, 
            amount, created_by, assigned_to, status, created_at, assigned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        
        const params = [
            serialNo, clientName, clientAddress, email, phoneNumber, 
            amount, req.user.user_id, assignedTo
        ];
        
        console.log('SQL Query:', query);
        console.log('Parameters:', params);

        const [result] = await db.execute(query, params);
        console.log('Database Result:', result);

        //send success response
        res.status(201).json({
            message: "Ticket created successfully",
            ticketId: serialNo,
            status: 'pending',
            assignee: {
                id: brokers[0].user_id,
                username: brokers[0].username,
                role: brokers[0].role_name
            }
        });

    } catch (error) {
        console.error("Create Ticket Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


//brokers to respond to assigned tickets
exports.respondToTicket = async (req, res) => {
    try {
        //validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { ticketId } = req.params;
        const { status } = req.body;

        // Check if ticket exists and is assigned to this broker
        const [tickets] = await db.execute(
            `SELECT t.*, u.role_id 
             FROM ticket t
             JOIN users u ON t.assigned_to = u.user_id
             WHERE t.serial_no = ? AND t.assigned_to = ?`,
            [ticketId, req.user.user_id]
        );

        if (tickets.length === 0) {
            return res.status(404).json({ 
                message: "Ticket not found or not assigned to you" 
            });
        }

        const ticket = tickets[0];

        // Verify the user is a broker (role_id = 3)
        if (ticket.role_id !== 3) {
            return res.status(403).json({ 
                message: "Only brokers can respond to tickets" 
            });
        }

        // Update ticket status using updated_at instead of last_updated
        const updateQuery = `
            UPDATE ticket 
            SET status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE serial_no = ?`;

        await db.execute(updateQuery, [status, ticketId]);

        // Send response
        return res.json({
            ticketId,
            status,
            respondedBy: req.user.user_id,
            updatedAt: new Date()
        });

    } catch (error) {
        console.error("Ticket Response Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getBrokerTickets = async (req, res) => {
    try {
        // Enhanced query to check both assigned_to and role_id
        const query = `
            SELECT 
                t.*,
                creator.username as creator_name,
                creator.email as creator_email,
                creator.first_name as creator_first_name,
                creator.last_name as creator_last_name,
                assignee.username as assignee_name,
                assignee.email as assignee_email,
                assignee.first_name as assignee_first_name,
                assignee.last_name as assignee_last_name
            FROM ticket t
            LEFT JOIN users creator ON t.created_by = creator.user_id
            LEFT JOIN users assignee ON t.assigned_to = assignee.user_id
            WHERE t.assigned_to = ? 
            AND assignee.role_id = 3
            AND assignee.is_active = 1
            ORDER BY t.created_at DESC`;

        //executes query using broker ID     
        const [tickets] = await db.execute(query, [req.user.user_id]);

        console.log('Broker ID:', req.user.user_id);
        console.log('Found tickets:', tickets);

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tickets found for this broker"
            });
        }

        //return the formatted tickets
        res.status(200).json({
            success: true,
            tickets: tickets.map(ticket => ({
                serial_no: ticket.serial_no,
                client_name: ticket.client_name,
                client_address: ticket.client_address,
                email: ticket.email,
                phone_number: ticket.phone_number,
                amount: ticket.amount,
                status: ticket.status,
                
                created_at: new Date(ticket.created_at).toISOString(),
                updated_at: ticket.updated_at ? new Date(ticket.updated_at).toISOString() : null,
                assigned_at: ticket.assigned_at ? new Date(ticket.assigned_at).toISOString() : null
            }))
        });

    } catch (error) {
        console.error('Error in getBrokerTickets:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching broker tickets"
        });
    }
};
exports.getTicketById = async (req, res) => {
    try {
        const { serialNo } = req.params;

        const query = `
            SELECT t.*, 
                   creator.username as creator_name,
                   assignee.username as assignee_name
            FROM ticket t
            LEFT JOIN users creator ON t.created_by = creator.user_id
            LEFT JOIN users assignee ON t.assigned_to = assignee.user_id
            WHERE t.serial_no = ?`;

        const [tickets] = await db.execute(query, [serialNo]);

        if (tickets.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        const ticket = tickets[0];

        res.json({
            success: true,
            ticket: {
                serial_no: ticket.serial_no,
                client_name: ticket.client_name,
                client_address: ticket.client_address,
                email: ticket.email,
                phone_number: ticket.phone_number,
                amount: ticket.amount,
                status: ticket.status,
                created_at: ticket.created_at,
                updated_at: ticket.updated_at,
                assigned_at: ticket.assigned_at,
                creator: ticket.creator_name,
                assignee: ticket.assignee_name
            }
        });

    } catch (error) {
        console.error('Get Ticket Error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch ticket details"
        });
    }
};