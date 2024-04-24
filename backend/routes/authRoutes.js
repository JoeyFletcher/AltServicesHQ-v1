require('dotenv').config();
const secret = process.env.SECRET_KEY;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database'); // Ensure this path is correct
const { expressjwt: expressJwt } = require('express-jwt'); // Make sure you've installed this package

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);  // Securely hash the password
        const result = await pool.query(
            'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );
        res.status(201).json({ message: "User registered successfully", userId: result.rows[0].user_id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering new user");
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userQuery.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        const user = userQuery.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        const payload = { user: { id: user.user_id } };
        jwt.sign(payload, 'secret_key', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// User Profile Route
router.get('/profile', expressJwt({ secret: 'secret_key', algorithms: ['HS256'] }), (req, res) => {
    const userId = req.auth.user.id;
    pool.query('SELECT user_id, username, email, created_at FROM users WHERE user_id = $1', [userId], (error, results) => {
        if (error) {
            return res.status(500).send('Error fetching user profile');
        }
        if (results.rows.length > 0) {
            res.json(results.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    });
});

module.exports = router;
