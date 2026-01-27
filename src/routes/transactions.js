const express = require('express');
const router = express.Router();
const db = require('../db');

// Create Transaction
router.post('/', async (req, res) => {
    const { user_id, merchant_id, amount, stability_rating } = req.body;
    try {
        // Default stability rating to 5 if not provided
        const rating = stability_rating || 5;

        const result = await db.query(
            `INSERT INTO transactions (user_id, merchant_id, amount, stability_rating) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, merchant_id, amount, rating]
        );
        const tx = result.rows[0];

        // Auto-schedule repayment for 7 days later
        await db.query(
            `INSERT INTO repayment_schedules (transaction_id, due_date, amount_due, status)
             VALUES ($1, NOW() + INTERVAL '7 days', $2, 'pending')`,
            [tx.id, tx.amount]
        );

        res.status(201).json(tx);
    } catch (err) {
        console.error('Error creating transaction:', err);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

// Get User History
router.get('/user/:userId', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT t.*, m.name as merchant_name, m.category 
             FROM transactions t
             JOIN merchants m ON t.merchant_id = m.id
             WHERE t.user_id = $1
             ORDER BY t.created_at DESC`,
            [req.params.userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).json({ error: 'Failed to fetch transaction history' });
    }
});

module.exports = router;
