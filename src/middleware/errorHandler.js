// Global error handling middleware
const globalErrorHandler = (err, req, res, next) => {
    console.error('❌ GLOBAL ERROR HANDLER:');
    console.error('🔍 Error message:', err.message);
    console.error('📋 Stack trace:', err.stack);
    console.error('🚩 Request details:', {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        params: req.params,
        query: req.query
    });

    // Handle specific error types
    if (err.code === 'ER_NO_SUCH_TABLE') {
        return res.status(500).json({ 
            error: 'Database table missing',
            message: 'Required database table does not exist' 
        });
    }
    
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        return res.status(500).json({ 
            error: 'Database connection failed',
            message: 'Cannot connect to database with provided credentials' 
        });
    }

    // Default error response
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
        timestamp: new Date().toISOString()
    });
};

module.exports = globalErrorHandler;