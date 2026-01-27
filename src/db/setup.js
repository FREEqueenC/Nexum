const fs = require('fs');
const path = require('path');
const db = require('./index');

const schemaPath = path.join(__dirname, '../../schema.sql');
const trustEnginePath = path.join(__dirname, '../../trust_engine.sql');

async function setupDatabase() {
    try {
        console.log('Reading SQL files...');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        const trustEngineSql = fs.readFileSync(trustEnginePath, 'utf8');

        console.log('Running schema.sql...');
        await db.query(schemaSql);

        console.log('Running trust_engine.sql...');
        await db.query(trustEngineSql);

        console.log('Database setup complete!');
        process.exit(0);
    } catch (err) {
        console.error('Error setting up database:', err);
        process.exit(1);
    }
}

setupDatabase();
