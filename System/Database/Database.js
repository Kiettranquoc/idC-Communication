// Backend server setup
const express = require('express');
const mysql = require('mysql');

const app = express();

// Database connection configuration
const connection = mysql.createConnection({
    host: '1.tcp.ap.ngrok.io',
    port: 13405,
    user: 'root',
    password: '',
    database: 'echl_store'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Example API endpoint to fetch username and password from database
app.get('/api/users', (req, res) => {
    connection.query('SELECT username, password FROM user', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error fetching data from database' });
            return;
        }
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
