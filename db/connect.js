const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'majorProj',
    password: 'Jman@600113',
    port: 5432,
  });

const testConnection = async () => {
try {
    const client = await pool.connect();
    console.log('PostgreSQL connected!');
    client.release();
} catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
}
};

// Call the function to test the connection when this file is imported
testConnection();

module.exports = {
    query: (text, params) => pool.query(text, params)
};