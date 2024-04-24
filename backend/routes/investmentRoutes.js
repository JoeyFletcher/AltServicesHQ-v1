// investmentRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../backend/database');
const { expressjwt: expressJwt } = require('express-jwt');

// Middleware for JWT that includes error handling
function jwtMiddleware() {
    return expressJwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256'] }).unless({
        path: [
            // paths that don't require authentication
        ]
    });
}

router.use(jwtMiddleware());

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { // Handling errors thrown by express-jwt
        console.log('JWT Error:', err);
        return res.status(401).send('Invalid Token');
    }
    next();
});

// Fund Manager sends an invitation
router.post('/invitations', expressJwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256'] }), async (req, res) => {
    const { fundId, investorId } = req.body;
    try {
        await pool.query(
            'INSERT INTO invitations (fund_id, investor_id, status) VALUES ($1, $2, 'invited')',
            [fundId, investorId]
        );
        res.status(201).send('Invitation sent successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Investor views their invitations
router.get('/invitations', async (req, res) => {
    const userId = req.auth.user.id;
    try {
        const { rows } = await pool.query(
            'SELECT * FROM invitations WHERE investor_id = $1',
            [userId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching invitations:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Investor responds to an invitation
router.patch('/invitations/:invitationId', async (req, res) => {
    const { status } = req.body;  // 'accepted' or 'rejected'
    const { invitationId } = req.params;
    const userId = req.auth.user.id;

    try {
        const { rows } = await pool.query(
            'UPDATE invitations SET status = $1 WHERE invitation_id = $2 AND investor_id = $3 RETURNING *',
            [status, invitationId, userId]
        );
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Invitation not found or not authorized.');
        }
    } catch (error) {
        console.error('Error updating invitation:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start onboarding process
router.post('/onboarding/:invitationId', async (req, res) => {
    const { invitationId } = req.params;
    try {
        // Implement onboarding logic here
        res.status(200).send('Onboarding started.');
    } catch (error) {
        console.error('Error starting onboarding:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
