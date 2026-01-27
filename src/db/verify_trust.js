const db = require('./index');

async function verifyTrustEngine() {
    try {
        console.log('Starting Trust Engine Verification...');

        // 1. Clean up test data
        await db.query("DELETE FROM notifications WHERE user_id IN (SELECT id FROM users WHERE email = 'test_trust@example.com')");
        await db.query("DELETE FROM repayment_schedules WHERE transaction_id IN (SELECT id FROM transactions WHERE user_id IN (SELECT id FROM users WHERE email = 'test_trust@example.com'))");
        await db.query("DELETE FROM transactions WHERE user_id IN (SELECT id FROM users WHERE email = 'test_trust@example.com')");
        await db.query("DELETE FROM verified_history WHERE user_id IN (SELECT id FROM users WHERE email = 'test_trust@example.com')");
        await db.query("DELETE FROM users WHERE email = 'test_trust@example.com'");
        await db.query("DELETE FROM merchants WHERE name = 'Trust Test Auto'");

        // 2. Setup Test Data
        console.log('Creating test user and merchant...');
        const userResult = await db.query(`
            INSERT INTO users (name, email, income_cycle, income_anchor_date, community_trust_score, proactive_communication_score)
            VALUES ('Trust Tester', 'test_trust@example.com', 'weekly', CURRENT_DATE + 7, 100, 5)
            RETURNING id
        `);
        const userId = userResult.rows[0].id;

        const merchantResult = await db.query(`
            INSERT INTO merchants (name, category)
            VALUES ('Trust Test Auto', 'Auto Repair')
            RETURNING id
        `);
        const merchantId = merchantResult.rows[0].id;

        // 3. Transactions & Verified History
        console.log('Adding transaction and history...');
        await db.query(`
            INSERT INTO transactions (user_id, merchant_id, amount, stability_rating)
            VALUES ($1, $2, 150.00, 8)
        `, [userId, merchantId]);

        await db.query(`
            INSERT INTO verified_history (user_id, type, status, verified_at)
            VALUES ($1, 'rent', 'verified', NOW())
        `, [userId]);

        // 4. Test Calculate Reliability Index
        console.log('Testing calculate_reliability_index...');
        const reliabilityResult = await db.query(`SELECT calculate_reliability_index($1) as score`, [userId]);
        const score = parseFloat(reliabilityResult.rows[0].score);

        console.log(`Reliability Score: ${score}`);
        // Expected: 
        // Proactive: 5 * 10 = 50. 30% of 50 = 15.
        // History: 1 verified item = 50. 30% of 50 = 15.
        // Essential Spend: 1/1 = 100%. 40% of 100 = 40.
        // Total = 15 + 15 + 40 = 70.

        if (Math.abs(score - 70) < 0.1) {
            console.log('✅ Reliability Index Calculation passed (Score: 70)');
        } else {
            console.error(`❌ Reliability Index Failed. Expected 70, got ${score}`);
        }

        // 5. Test Irregularity Window Logic (Mocking time/dates)
        // We'll insert a past due schedule and run the process
        console.log('Testing irregularity window...');

        // Transaction for repayment
        const txResult = await db.query(`
            INSERT INTO transactions (user_id, merchant_id, amount, stability_rating)
            VALUES ($1, $2, 50.00, 9)
            RETURNING id
        `, [userId, merchantId]);
        const txId = txResult.rows[0].id;

        // Pending schedule, due 25 hours ago (Window is 48h)
        // Should trigger a reminder 
        await db.query(`
            INSERT INTO repayment_schedules (transaction_id, due_date, amount_due, status, reminders_sent)
            VALUES ($1, CURRENT_DATE - 1, 50.00, 'pending', 0)
        `, [txId]);

        await db.query('SELECT process_irregularity_window()');

        // Check for notification
        const notifResult = await db.query(`
            SELECT type FROM notifications WHERE user_id = $1 AND type = 'Reminder'
        `, [userId]);

        if (notifResult.rows.length > 0) {
            console.log('✅ Reminder notification generated successfully');
        } else {
            console.error('❌ Failed to generate reminder notification');
        }

        console.log('Verification Complete.');
        process.exit(0);

    } catch (err) {
        console.error('Verification failed:', err);
        process.exit(1);
    }
}

verifyTrustEngine();
