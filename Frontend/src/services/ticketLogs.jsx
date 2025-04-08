exports.getTicketLogs = async (req, res) => {
    try {
        const userId = req.user.user_id;     //extract userId from request object
        const roleId = req.user.role_id;      //extract roleId from request object
        //base SQL query to retrieve ticket logs
        let query = `
            SELECT 
                tl.created_at,
                tl.ticket_id,
                tl.action,
                tl.status,
                u.username
            FROM ticket_logs tl
            JOIN users u ON tl.user_id = u.user_id
            JOIN tickets t ON tl.ticket_id = t.serial_no
            WHERE 1=1
        `;

        const params = [];   //secure sql query parameters

        // If user is a broker, only show their tickets
        if (roleId === 3) {
            query += ` AND t.assigned_to = ?`;
            params.push(userId);  //add userId to params array
        }
        // Order logs by most recent first
        query += ` ORDER BY tl.created_at DESC`;
        // Execute the query with parameters
        const [logs] = await db.execute(query, params);
        res.json(logs);

    } catch (error) {
        console.error("Get Ticket Logs Error:", error);
        res.status(500).json({ message: "Failed to fetch logs" });
    }
};