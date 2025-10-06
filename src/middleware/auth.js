const jwt = require('jsonwebtoken');
const db = require('../config/database');

console.log('🔧 Initializing authentication middleware...');

/**
 * JWT Authentication Middleware
 * This middleware verifies JWT tokens from Authorization header
 * and attaches the user data to the request object
 */
const authenticateToken = async (req, res, next) => {
    const operationId = `AUTH_${Date.now()}`;
    
    try {
        console.log(`🛡️ [${operationId}] Starting authentication process...`);
        
        // Get the authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

        console.log(`📨 [${operationId}] Request received: ${req.method} ${req.originalUrl}`);
        console.log(`🔐 [${operationId}] Token present: ${!!token}`);

        if (!token) {
            console.warn(`⚠️ [${operationId}] Authentication failed: No token provided`);
            return res.status(401).json({ 
                success: false,
                error: 'Access token required',
                message: 'Please provide a valid JWT token in Authorization header'
            });
        }

        // Verify the JWT token
        console.log(`🔍 [${operationId}] Verifying JWT token...`);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log(`✅ [${operationId}] Token verified for user:`, { 
            user_id: decoded.userId, 
            email: decoded.email 
        });

        // You can add additional user verification from database here
        // Example: Verify user still exists and is active
        try {
            const [users] = await db.execute(
                'SELECT id, email, name FROM users WHERE id = ? AND is_active = true',
                [decoded.userId]
            );

            if (users.length === 0) {
                console.warn(`⚠️ [${operationId}] User not found or inactive: ${decoded.userId}`);
                return res.status(401).json({
                    success: false,
                    error: 'Invalid token',
                    message: 'User account not found or inactive'
                });
            }

            // Attach user data to request object
            req.user = users[0];
            console.log(`👤 [${operationId}] User attached to request: ${req.user.email}`);

        } catch (dbError) {
            console.error(`❌ [${operationId}] Database error during user verification:`, dbError.message);
            // Continue with decoded token if database check fails
            req.user = { id: decoded.userId, email: decoded.email };
            console.warn(`⚠️ [${operationId}] Using token data due to DB error, proceeding cautiously`);
        }

        // Proceed to the next middleware or route handler
        console.log(`✅ [${operationId}] Authentication successful, proceeding to route handler`);
        next();

    } catch (error) {
        console.error(`❌ [${operationId}] Authentication failed:`, error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ 
                success: false,
                error: 'Invalid token',
                message: 'Malformed or invalid JWT token'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ 
                success: false,
                error: 'Token expired',
                message: 'JWT token has expired, please login again'
            });
        }

        // Generic error response
        res.status(500).json({ 
            success: false,
            error: 'Authentication failed',
            message: 'Internal server error during authentication'
        });
    }
};

/**
 * Optional: Admin role verification middleware
 * Use this after authenticateToken to require admin privileges
 */
const requireAdmin = (req, res, next) => {
    const operationId = `ADMIN_CHECK_${Date.now()}`;
    
    try {
        console.log(`👮 [${operationId}] Checking admin privileges...`);
        
        if (!req.user) {
            console.warn(`⚠️ [${operationId}] Admin check failed: No user data`);
            return res.status(401).json({ 
                success: false,
                error: 'Authentication required',
                message: 'Please authenticate before checking roles'
            });
        }

        // Check if user has admin role (adjust based on your user model)
        if (req.user.role !== 'admin') {
            console.warn(`⚠️ [${operationId}] Insufficient privileges for user: ${req.user.email}`);
            return res.status(403).json({ 
                success: false,
                error: 'Insufficient privileges',
                message: 'Admin role required to access this resource'
            });
        }

        console.log(`✅ [${operationId}] Admin privileges confirmed for: ${req.user.email}`);
        next();

    } catch (error) {
        console.error(`❌ [${operationId}] Admin check failed:`, error.message);
        res.status(500).json({ 
            success: false,
            error: 'Role verification failed',
            message: 'Internal server error during role verification'
        });
    }
};

/**
 * Optional: Optional authentication middleware
 * Attaches user if token exists, but doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
    const operationId = `OPTIONAL_AUTH_${Date.now()}`;
    
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            console.log(`🔐 [${operationId}] Optional token found, verifying...`);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach user data to request object
            req.user = { id: decoded.userId, email: decoded.email };
            console.log(`✅ [${operationId}] Optional authentication successful`);
        } else {
            console.log(`🔓 [${operationId}] No token provided, proceeding without authentication`);
            req.user = null;
        }

        next();

    } catch (error) {
        console.warn(`⚠️ [${operationId}] Optional auth failed, proceeding without user:`, error.message);
        req.user = null;
        next(); // Continue even if token is invalid
    }
};

console.log('✅ Authentication middleware configured successfully');

module.exports = {
    authenticateToken,
    requireAdmin,
    optionalAuth
};