const express = require('express');
const router = express.Router();
const db = require('../db');

// Get Notifications
router.get('/user/:userId', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT * FROM notifications 
             WHERE user_id = $1 
             ORDER BY sent_at DESC`,
            [req.params.userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// Respond to Notification (e.g. Acknowledge Soft Grace)
router.post('/:id/respond', async (req, res) => {
    try {
        // Call stored procedure to record response and potentially update score
        await db.query('SELECT record_notification_response($1)', [req.params.id]);

        // Get updated notification to confirm
        const result = await db.query('SELECT * FROM notifications WHERE id = $1', [req.params.id]);
        res.json({ message: 'Response recorded', notification: result.rows[0] });
    } catch (err) {
        console.error('Error responding to notification:', err);
        res.status(500).json({ error: 'Failed to record response' });
    }
});

// Proactive Grace Request
router.post('/request-grace', async (req, res) => {
    const { user_id, reason } = req.body;
    try {
        // 1. Check Eligibility
        const eligibilityRes = await db.query('SELECT check_leniency_eligibility($1) as type', [user_id]);
        const type = eligibilityRes.rows[0].type;

        if (type === 'Soft-Grace') {
            // 2. Grant Grace: Find latest pending schedule
            const scheduleRes = await db.query(
                `SELECT id FROM repayment_schedules 
                 WHERE transaction_id IN (SELECT id FROM transactions WHERE user_id = $1) 
                 AND status = 'pending' 
                 ORDER BY due_date ASC LIMIT 1`,
                [user_id]
            );

            if (scheduleRes.rows.length > 0) {
                const scheduleId = scheduleRes.rows[0].id;
                // Update schedule to 'graced'
                await db.query(`UPDATE repayment_schedules SET status = 'graced' WHERE id = $1`, [scheduleId]);

                // Reward Proactivity (+5 points for communicating before failure)
                await db.query(
                    `UPDATE users SET proactive_communication_score = proactive_communication_score + 5 WHERE id = $1`,
                    [user_id]
                );

                res.json({
                    status: 'approved',
                    message: 'Grace granted. Thank you for communicating early.',
                    bonus: '+5 Proactive Score'
                });
            } else {
                res.status(400).json({ status: 'no_pending', message: 'No pending payments to grace.' });
            }
        } else {
            res.json({ status: 'review', message: 'Grace request submitted for review.' });
        }
    } catch (err) {
        console.error('Error requesting grace:', err);
        res.status(500).json({ error: 'Failed to process grace request' });
    }
});

module.exports = router;
