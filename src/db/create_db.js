const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
    // Connect to default 'postgres' database to create the new one
    // Extract base connection string without the database name
    const dbUrl = process.env.DATABASE_URL;
    const baseUrl = dbUrl.substring(0, dbUrl.lastIndexOf('/'));

    const client = new Client({
        connectionString: `${baseUrl}/postgres`
    });

    try {
        await client.connect();

        // Check if database exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'community_bnpl'");

        if (res.rows.length === 0) {
            console.log('Creating database community_bnpl...');
            await client.query('CREATE DATABASE community_bnpl');
            console.log('Database created successfully.');
        } else {
            console.log('Database community_bnpl already exists.');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createDatabase();
