const express = require('express');
const router = express.Router();

// Import route modules
const blogRoutes = require('./blogs');
const commentRoutes = require('./comments');

// Use the routes
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;