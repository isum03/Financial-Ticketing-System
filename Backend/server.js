const express = require('express');
const cors = require('cors');
require('dotenv').config();

//import route handlers
const authRoutes = require('./Route/authRoute');
const userRoutes = require('./Route/userRoute');
const roleRoutes = require('./Route/roleRoute');
const ticketRoutes = require('./Route/ticketRoute');


const app = express();

// global middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/tickets', ticketRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
//Server Configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});