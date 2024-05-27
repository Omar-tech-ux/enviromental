// Load environment variables from the .env file
require('dotenv').config();

const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Connect to the database to test the connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log(result.rows); // Output the current time from the PostgreSQL server
    });
});

module.exports = pool;
