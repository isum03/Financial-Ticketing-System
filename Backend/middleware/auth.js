const jwt = require("jsonwebtoken");
const db = require("../Config/db");
//to authenticate JWT token
const auth = async (req, res, next) => {
    try {
        //Extract tokens
        const token = req.header("Authorization")?.split(" ")[1];
        console.log("Received token:", token);
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        // Check if token is valid and active in sessions
        const [sessions] = await db.execute(
            `SELECT * FROM user_sessions 
             WHERE user_id = ? AND token = ? AND is_active = 1`,
            [decoded.userId, token]
        );

        if (sessions.length === 0) {
            return res.status(401).json({ message: "Session expired" });
        }

        // Get user details with role
        const [users] = await db.execute(
            `SELECT u.user_id, u.username, u.email, r.role_name 
             FROM users u
             JOIN roles r ON u.role_id = r.role_id
             WHERE u.user_id = ? AND u.is_active = 1`,
            [decoded.userId]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user to request
        req.user = users[0];
        next();

    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ message: "Token is invalid" });
    }
};

module.exports = auth;