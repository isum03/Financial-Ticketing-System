const db = require('../Config/db');
//get the all users from db
exports.getUsers = async (req, res) => {
    try {
        //query to fetch data from db
        const [users] = await db.execute(
            `SELECT u.user_id, u.username, u.email, u.first_name, u.last_name, 
             r.role_name FROM users u
             JOIN roles r ON u.role_id = r.role_id
             WHERE u.is_active = 1`
        );
        //send the list of users as json response
        res.json(users);
    } catch (error) {
        console.error("Get Users Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//get specific user by id
exports.getUserById = async (req, res) => {
    try {
        // Check if user has permission to view
        const [users] = await db.execute(
            `SELECT u.user_id, u.username, u.email, u.first_name, u.last_name, 
             u.phone, r.role_name 
             FROM users u
             JOIN roles r ON u.role_id = r.role_id
             WHERE u.user_id = ? AND u.is_active = 1`,
            [req.params.id]
        );

        // if user not found
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(users[0]);
    } catch (error) {
        console.error("Get User Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

