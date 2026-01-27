-- Users Table
-- Tracks income cycles and community trust scores.
-- proactiveness logic: community_trust_score updated by repayment, proactive_communication_score updated by lenient response
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    income_cycle TEXT CHECK (income_cycle IN ('weekly', 'bi-weekly')) NOT NULL,
    income_anchor_date DATE NOT NULL, -- The next expected payday
    community_trust_score NUMERIC DEFAULT 100, -- Behavioral score, start at 100
    proactive_communication_score NUMERIC DEFAULT 0, -- Track responsiveness to soft-grace
    joined_at TIMESTAMP DEFAULT NOW() -- For 90-day leniency check
);

-- Verified History Table
-- Tracks proof of past pay, rent, or phone bill history for Reliability Index
CREATE TABLE verified_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type TEXT CHECK (type IN ('rent', 'phone', 'past_pay')) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
    verified_at TIMESTAMP
);

-- Merchants Table
-- Categories specifically for stability/necessity tracking
CREATE TABLE merchants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT CHECK (category IN ('Auto Repair', 'Childcare', 'Grooming', 'Other')) NOT NULL
);

-- Transactions Table
-- Links user, merchant, and stability context
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    merchant_id INTEGER REFERENCES merchants(id),
    amount NUMERIC NOT NULL,
    stability_rating INTEGER CHECK (stability_rating BETWEEN 1 AND 10), -- 1-10 rating of purchase stability (e.g. work readiness)
    created_at TIMESTAMP DEFAULT NOW()
);

-- Repayment Schedules Table
-- Dynamically aligned to paydays. Tracks reminders for Irregularity Window.
CREATE TABLE repayment_schedules (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(id),
    due_date DATE NOT NULL,
    amount_due NUMERIC NOT NULL,
    status TEXT CHECK (status IN ('pending', 'paid', 'missed', 'graced', 'late')) DEFAULT 'pending',
    reminders_sent INTEGER DEFAULT 0,
    last_reminder_at TIMESTAMP
);

-- Notifications Table
-- Tracks Leniency triggers and user responses
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type TEXT CHECK (type IN ('Soft-Grace', 'Late-Fee', 'Reminder')) NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW(),
    responded_at TIMESTAMP -- Null if no response yet
);

-- Indexes for pattern recognition
CREATE INDEX idx_users_trust_score ON users(community_trust_score);
CREATE INDEX idx_transactions_user_merchant ON transactions(user_id, merchant_id);
CREATE INDEX idx_repayments_status ON repayment_schedules(status);

-- Leniency Logic Functions

-- Function to determine if a user qualifies for Soft-Grace vs Late-Fee
CREATE OR REPLACE FUNCTION check_leniency_eligibility(p_user_id INTEGER) 
RETURNS TEXT AS $$
DECLARE
    v_joined_at TIMESTAMP;
BEGIN
    SELECT joined_at INTO v_joined_at FROM users WHERE id = p_user_id;
    
    -- Check if user is within first 90 days
    IF v_joined_at > NOW() - INTERVAL '90 days' THEN
        RETURN 'Soft-Grace';
    ELSE
        RETURN 'Late-Fee';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to update proactive score upon response
CREATE OR REPLACE FUNCTION record_notification_response(p_notification_id INTEGER)
RETURNS VOID AS $$
DECLARE
    v_sent_at TIMESTAMP;
    v_user_id INTEGER;
    v_response_time INTERVAL;
BEGIN
    SELECT sent_at, user_id INTO v_sent_at, v_user_id 
    FROM notifications WHERE id = p_notification_id;

    -- Update notification status
    UPDATE notifications 
    SET responded_at = NOW() 
    WHERE id = p_notification_id;

    v_response_time := NOW() - v_sent_at;

    -- Update proactive_communication_score logic (example: +1 if responded within 24 hours)
    IF v_response_time < INTERVAL '24 hours' THEN
        UPDATE users 
        SET proactive_communication_score = proactive_communication_score + 1 
        WHERE id = v_user_id;
    END IF;
END;
$$ LANGUAGE plpgsql;
