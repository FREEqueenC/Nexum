const fs = require('fs');
const path = require('path');
const db = require('./index');

async function seedMerchants() {
    try {
        console.log('🌱 Seeding Merchants...');
        const sqlPath = path.join(__dirname, 'seed_merchants.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await db.query(sql);
        console.log('✅ Merchants Seeded Successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to seed merchants:', err);
        process.exit(1);
    }
}

seedMerchants();
