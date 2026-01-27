const express = require('express');
const router = express.Router();
const db = require('../db');

// Register a new user
router.post('/', async (req, res) => {
    const { name, email, income_cycle, income_anchor_date } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO users (name, email, income_cycle, income_anchor_date) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, income_cycle, income_anchor_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user', details: err.message });
    }
});

// Get user details
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Get Trust Score details
router.get('/:id/trust-score', async (req, res) => {
    try {
        // Get base user data
        const userResult = await db.query('SELECT community_trust_score, proactive_communication_score FROM users WHERE id = $1', [req.params.id]);
        if (userResult.rows.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = userResult.rows[0];

        // Calculate dynamic Reliability Index
        const reliabilityResult = await db.query('SELECT calculate_reliability_index($1) as score', [req.params.id]);
        const reliabilityScore = parseFloat(reliabilityResult.rows[0].score).toFixed(1);

        res.json({
            community_trust_score: parseFloat(user.community_trust_score).toFixed(1),
            reliability_index: reliabilityScore,
            proactive_score: user.proactive_communication_score
        });
    } catch (err) {
        console.error('Error calculating trust score:', err);
        res.status(500).json({ error: 'Failed to calculate score' });
    }
});

module.exports = router;
