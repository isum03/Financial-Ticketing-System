//db config module using mysql2/promise library
const mysql = require('mysql2/promise');

// Create a connection pool to the MySQL database using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,  
    waitForConnections: true,   //wait when connection is full
    connectionLimit: 10,  //maximum number of pool could have
    queueLimit: 0  //unlimited queue size
});

module.exports = pool;