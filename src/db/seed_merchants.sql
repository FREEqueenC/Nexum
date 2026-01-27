-- Insert Essential Merchants if they don't exist
INSERT INTO merchants (id, name, category, reliability_rating)
VALUES (1, 'North County Auto', 'Auto Repair', 5.0),
    (2, 'Little Stars Daycare', 'Childcare', 5.0),
    (3, 'City Cuts', 'Grooming', 4.8) ON CONFLICT (id) DO
UPDATE
SET name = EXCLUDED.name,
    category = EXCLUDED.category;
-- Reset sequence to avoid collisions if auto-increment is used later
SELECT setval(
        'merchants_id_seq',
        (
            SELECT MAX(id)
            FROM merchants
        )
    );