const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./api/routes');

console.log('🔧 Initializing Express application...');

const app = express();

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`📥 INCOMING REQUEST: ${req.method} ${req.originalUrl}`);
    console.log(`👤 User-Agent: ${req.get('User-Agent')}`);
    console.log(`📍 IP: ${req.ip}`);
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`📤 RESPONSE SENT: ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });
    
    next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api', apiRoutes);

// Enhanced health check route
app.get('/health', (req, res) => {
    console.log('🏥 Health check requested');
    const healthStatus = {
        status: 'OK',
        message: 'Blog API is running successfully!',
        timestamp: new Date().toISOString(),
        uptime: `${process.uptime().toFixed(2)} seconds`,
        memory: process.memoryUsage(),
        database: 'Checking...' // You can add actual DB health check here
    };
    
    console.log('✅ Health check passed');
    res.status(200).json(healthStatus);
});

// Enhanced 404 handler
app.use('*', (req, res) => {
    console.warn(`⚠️  404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
        error: 'Route not found',
        message: `The requested route ${req.originalUrl} does not exist.`,
        timestamp: new Date().toISOString()
    });
});

// Enhanced global error handler
app.use((err, req, res, next) => {
    console.error('❌ UNEXPECTED ERROR:');
    console.error('🔍 Error message:', err.message);
    console.error('📋 Stack trace:', err.stack);
    console.error('🚩 Request details:', {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        params: req.params,
        query: req.query
    });
    
    // Multer errors (file upload)
    if (err.code === 'LIMIT_FILE_SIZE') {
        console.error('📁 File upload error: File too large');
        return res.status(413).json({ 
            error: 'File too large',
            message: 'File size must be less than 5MB'
        });
    }
    
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        console.error('📁 File upload error: Unexpected file field');
        return res.status(400).json({ 
            error: 'Unexpected file field',
            message: 'Check file field name'
        });
    }
    
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
        timestamp: new Date().toISOString()
    });
});

console.log('✅ Express application configured successfully');

module.exports = app;