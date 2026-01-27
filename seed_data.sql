-- Initial Seed Data
INSERT INTO users (
        id,
        name,
        email,
        income_cycle,
        income_anchor_date
    )
VALUES (
        1,
        'Alex Nexus',
        'alex@nexum.app',
        'weekly',
        CURRENT_DATE + INTERVAL '5 days'
    ) ON CONFLICT (id) DO NOTHING;
INSERT INTO merchants (id, name, category)
VALUES (1, 'North County Auto', 'Auto Repair'),
    (2, 'City Daycare', 'Childcare'),
    (3, 'Fresh Cuts', 'Grooming') ON CONFLICT (id) DO NOTHING;