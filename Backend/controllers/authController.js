const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../Config/db");
const { validationResult } = require("express-validator");

//create accounts with encrypted passwords
exports.signup = async (req, res) => {
    try {
        // Validate request data 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //unpack request body
        const {
            firstName,
            lastName,
            email,
            phone,
            username,
            password,
            roleId
        } = req.body;

        // Check if email exists
        const [existingEmail] = await db.execute(
            'SELECT user_id FROM users WHERE email = ?',
            [email]
        );

        if (existingEmail.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Check if username exists
        const [existingUsername] = await db.execute(
            'SELECT user_id FROM users WHERE username = ?',
            [username]
        );

        if (existingUsername.length > 0) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Insert user values to db
        const [result] = await db.execute(
            `INSERT INTO users (first_name, last_name, email, phone, username, password_hash, role_id)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, email, phone, username, passwordHash, roleId]
        );

        res.status(201).json({
            message: "Registration successful",
            userId: result.insertId
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//authnticate users with JWT tokens
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email with role information
        const [users] = await db.execute(
            `SELECT u.*, r.role_name 
             FROM users u 
             JOIN roles r ON u.role_id = r.role_id 
             WHERE u.email = ? AND u.is_active = 1`,
            [email]
        );

        //if no matching user found
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        /* Optional: Role validation if needed
        if (req.body.role && user.role_name !== req.body.role) {
            return res.status(401).json({ 
                message: "Selected role does not match user credentials" 
            });
        }*/

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.user_id,
                username: user.username,
                role: user.role_name
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }  //token valid to 2hrs
        );

        // Create user session
        await db.execute(
            `INSERT INTO user_sessions (user_id, token) VALUES (?, ?)`,
            [user.user_id, token]
        );

        // Send single response with all data
        return res.json({
            token,
            user: {
                id: user.user_id,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.role_name
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
//handle forgot password requests
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user exists
        const [users] = await db.execute(
            'SELECT user_id, email FROM users WHERE email = ? AND is_active = 1',
            [email]
        );

        //if no user found with the email
        if (users.length === 0) {
            return res.status(404).json({ 
                message: "No account found with this email" 
            });
        }

        // Generate reset token
        const resetToken = jwt.sign(
            { userId: users[0].user_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Store reset token and expire time in the database
        await db.execute(
            `UPDATE users 
             SET reset_token = ?, 
                 reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) 
             WHERE user_id = ?`,
            [resetToken, users[0].user_id]
        );

        // In production, send email with reset link
        // For development, return token directly
        res.json({ 
            success: true,
            message: "Password reset instructions sent",
            //resetToken: resetToken 
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ 
            message: "Server error while processing password reset request" 
        });
    }
};