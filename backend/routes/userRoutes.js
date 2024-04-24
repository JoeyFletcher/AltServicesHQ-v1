const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../database');  // Assuming your database setup is accessible here

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8); // Hashing the password

    // SQL query to insert a new user into the database
    const query = 'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)';
    const values = [username, hashedPassword, email];

    try {
        await pool.query(query, values);
        res.send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering new user');
    }
});

module.exports = router;
