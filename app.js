/*
const express = require('express');
const app = express(); // Initialize the Express app
const helmet = require('helmet'); // Import Helmet for security
const pool = require('./backend/database'); // Database connection setup

const fundRoutes = require('./routes/fundRoutes'); // Fund management routes
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const investmentRoutes = require('./routes/investmentRoutes'); // New file for investment-related routes

app.use(helmet()); // Apply Helmet to enhance API's security
app.use(express.json()); // Middleware for parsing JSON bodies

// Optional logging middleware to log each request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Proceed to the next middleware or route handler
});

// Route setup
app.use('/funds', fundRoutes); // Routes related to fund management
app.use('/api/users', authRoutes); // Routes for user authentication and profiles
app.use('/api/investments', investmentRoutes); // Routes for managing investments and invitations

// Test route to check database connectivity
app.get('/test-db', async (req, res) => {
    try {
        const queryResult = await pool.query('SELECT * FROM users');
        res.json(queryResult.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Simple route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware for any unhandled errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server on the specified port
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
