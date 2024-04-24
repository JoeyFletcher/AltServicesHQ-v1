const express = require('express');
const router = express.Router();
const pool = require('../backend/database'); // Adjust path as necessary to point to your database configuration

// POST route to create a new fund
router.post('/', async (req, res) => {
    const { name, description, manager_id } = req.body;
    try {
        const newFund = await pool.query(
            "INSERT INTO funds (name, description, manager_id) VALUES ($1, $2, $3) RETURNING *",
            [name, description, manager_id]
        );
        res.status(201).json(newFund.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create fund");
    }
});

// GET route to retrieve all funds
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM funds");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve funds");
    }
});

// GET route to retrieve a specific fund by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM funds WHERE fund_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Fund not found');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve fund");
    }
});

// Additional routes for updating and deleting funds can be added here...

module.exports = router;
