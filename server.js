require('dotenv').config();

console.log('🚀 STARTING BLOG API SERVER...');
console.log(`⏰ Server start time: ${new Date().toISOString()}`);
console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);

try {
    const app = require('./src/app');
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
        console.log('\n=========================================');
        console.log('✅ BLOG API SERVER STARTED SUCCESSFULLY!');
        console.log(`📍 Port: ${PORT}`);
        console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
        console.log(`📚 API Docs: http://localhost:${PORT}/api`);
        console.log('=========================================\n');
    });

    // Enhanced server event listeners
    server.on('error', (error) => {
        console.error('❌ SERVER STARTUP ERROR:', error.message);
        if (error.code === 'EADDRINUSE') {
            console.error(`💡 Port ${PORT} is already in use. Try a different port.`);
        }
        process.exit(1);
    });

    // Graceful shutdown handling
    process.on('SIGINT', () => {
        console.log('\n🔻 Received SIGINT signal. Shutting down gracefully...');
        server.close(() => {
            console.log('✅ Server closed successfully.');
            process.exit(0);
        });
    });

    process.on('SIGTERM', () => {
        console.log('\n🔻 Received SIGTERM signal. Shutting down gracefully...');
        server.close(() => {
            console.log('✅ Server closed successfully.');
            process.exit(0);
        });
    });

    // Uncaught exception handling
    process.on('uncaughtException', (error) => {
        console.error('❌ UNCAUGHT EXCEPTION:', error.message);
        console.error('🔍 Stack trace:', error.stack);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.error('❌ UNHANDLED PROMISE REJECTION:', reason);
        console.error('🔍 At promise:', promise);
        process.exit(1);
    });

} catch (error) {
    console.error('❌ CRITICAL SERVER STARTUP FAILURE:');
    console.error('🔍 Error details:', error.message);
    console.error('📋 Stack trace:', error.stack);
    process.exit(1);
}