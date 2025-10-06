const mysql = require('mysql2');
require('dotenv').config();

console.log('🔧 Initializing database connection...');
console.log(`📊 Database Host: ${process.env.DB_HOST}`);
console.log(`📊 Database Name: ${process.env.DB_NAME}`);

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'blog_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000, // 60 seconds
    timeout: 60000, // 60 seconds
    reconnect: true
});

// Enhanced connection test with better logging
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ DATABASE CONNECTION FAILED:', err.message);
        console.error('🔍 Error details:', {
            code: err.code,
            errno: err.errno,
            sqlState: err.sqlState
        });
        
        // Retry logic
        console.log('🔄 Attempting to reconnect in 5 seconds...');
        setTimeout(() => {
            pool.getConnection((retryErr) => {
                if (retryErr) {
                    console.error('❌ RECONNECTION FAILED:', retryErr.message);
                } else {
                    console.log('✅ Reconnected to database successfully!');
                }
            });
        }, 5000);
        return;
    }
    
    console.log('✅ SUCCESS: Connected to MySQL database!');
    console.log(`📊 Connection ID: ${connection.threadId}`);
    console.log(`💾 Database: ${process.env.DB_NAME}`);
    
    // Test query to verify database access
    connection.query('SELECT 1 + 1 AS result', (queryErr, results) => {
        if (queryErr) {
            console.error('❌ Database test query failed:', queryErr.message);
        } else {
            console.log('✅ Database test query successful:', results[0]);
        }
        connection.release();
        console.log('🔗 Database connection released back to pool');
    });
});

// Enhanced event listeners for connection pool
pool.on('acquire', (connection) => {
    console.log(`🔗 Connection ${connection.threadId} acquired`);
});

pool.on('release', (connection) => {
    console.log(`🔗 Connection ${connection.threadId} released`);
});

pool.on('enqueue', () => {
    console.log('⏳ Waiting for available connection slot...');
});

// Handle pool errors
pool.on('error', (err) => {
    console.error('❌ DATABASE POOL ERROR:', err.message);
    console.error('🔍 Pool error details:', err);
});

module.exports = pool.promise();