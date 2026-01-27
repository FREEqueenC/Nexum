-- Trust Engine Logic

-- 1. Calculate Reliability Index
-- Composite score: 
-- - Proactive Communication (30%)
-- - Verified History (30%)
-- - Essential Category Spend (40%)
CREATE OR REPLACE FUNCTION calculate_reliability_index(p_user_id INTEGER)
RETURNS NUMERIC AS $$
DECLARE
    v_proactive_score NUMERIC;
    v_history_score NUMERIC;
    v_essential_spend_pct NUMERIC;
    v_total_transactions INTEGER;
    v_essential_transactions INTEGER;
BEGIN
    -- Get Proactive Score (Normalize logic assumption: score > 10 is max reliability)
    SELECT LEAST(proactive_communication_score * 10, 100) INTO v_proactive_score 
    FROM users WHERE id = p_user_id;

    -- Get Verified History Score (1 verified item = 50, 2+ = 100)
    SELECT CASE WHEN count(*) >= 2 THEN 100 WHEN count(*) = 1 THEN 50 ELSE 0 END 
    INTO v_history_score
    FROM verified_history 
    WHERE user_id = p_user_id AND status = 'verified';

    -- Calculate Essential Category Spend %
    SELECT count(*) INTO v_total_transactions FROM transactions WHERE user_id = p_user_id;
    
    IF v_total_transactions = 0 THEN
        v_essential_spend_pct := 0;
    ELSE
        SELECT count(*) INTO v_essential_transactions 
        FROM transactions t
        JOIN merchants m ON t.merchant_id = m.id
        WHERE t.user_id = p_user_id 
        AND m.category IN ('Auto Repair', 'Childcare', 'Grooming');

        v_essential_spend_pct := (v_essential_transactions::NUMERIC / v_total_transactions::NUMERIC) * 100;
    END IF;

    -- Weighted Average: 30% Proactive, 30% History, 40% Essential Spend
    RETURN (COALESCE(v_proactive_score,0) * 0.3) + 
           (COALESCE(v_history_score,0) * 0.3) + 
           (COALESCE(v_essential_spend_pct,0) * 0.4);
END;
$$ LANGUAGE plpgsql;

-- 2. Process Irregularity Window & Late Logic
-- Batch job simulation: checks for due payments
-- Window: 48 hours past due.
-- Actions: Send Reminder (up to 2). If window passed & 2 reminders sent -> Late Fee & Trust Score Drop.
CREATE OR REPLACE FUNCTION process_irregularity_window()
RETURNS VOID AS $$
DECLARE
    r RECORD;
BEGIN
    -- Loop through pending schedules that are past due
    FOR r IN SELECT * FROM repayment_schedules 
             WHERE status = 'pending' AND due_date < CURRENT_DATE 
    LOOP
        -- Check if within 48-hour irregularity window (using due_date vs now)
        -- Note: simplified logic assuming 'current_date' implies checking at specific interval
        
        IF NOW() < (r.due_date + INTERVAL '48 hours') THEN
            -- In Window: Send Reminder if not sent recently (e.g., every 24h)
            IF r.reminders_sent < 2 THEN
               -- Logic to avoid spamming: check last_reminder_at
               IF r.last_reminder_at IS NULL OR r.last_reminder_at < NOW() - INTERVAL '24 hours' THEN
                   -- Send Reminder
                   INSERT INTO notifications (user_id, type, sent_at)
                   VALUES ((SELECT user_id FROM transactions WHERE id = r.transaction_id), 'Reminder', NOW());
                   
                   UPDATE repayment_schedules 
                   SET reminders_sent = reminders_sent + 1, last_reminder_at = NOW()
                   WHERE id = r.id;
               END IF;
            END IF;
        
        ELSE
            -- Outside Window ( > 48 hours late)
            IF r.reminders_sent >= 2 THEN
                -- Mark as Late/Missed
                UPDATE repayment_schedules SET status = 'late' WHERE id = r.id;
                
                -- Decrease Trust Score (example penalty: -10)
                UPDATE users 
                SET community_trust_score = GREATEST(community_trust_score - 10, 0)
                WHERE id = (SELECT user_id FROM transactions WHERE id = r.transaction_id);
                
                -- Trigger Late Fee Notification
                INSERT INTO notifications (user_id, type, sent_at)
                VALUES ((SELECT user_id FROM transactions WHERE id = r.transaction_id), 'Late-Fee', NOW());
            ELSE
                 -- Edge case: > 48 hours but reminders failed/not sent enough? 
                 -- For strict rule "Allow... with two reminders", we might force a reminder here or just penalize.
                 -- Assuming we strictly wait for 2 reminders before penalizing:
                 IF r.reminders_sent < 2 THEN
                     -- Send emergency reminder? Or arguably if 48h passed, we just late it. 
                     -- "with two reminders before decreasing trust score" implies the process MUST send them.
                     -- Let's send one now.
                     INSERT INTO notifications (user_id, type, sent_at)
                     VALUES ((SELECT user_id FROM transactions WHERE id = r.transaction_id), 'Reminder', NOW());
                     UPDATE repayment_schedules 
                     SET reminders_sent = reminders_sent + 1, last_reminder_at = NOW()
                     WHERE id = r.id;
                 END IF;
            END IF;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
