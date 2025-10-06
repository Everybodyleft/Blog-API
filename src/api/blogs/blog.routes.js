const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');
const upload = require('../../config/upload');
const { authenticateToken, requireAdmin } = require('../../middleware/auth'); // Add this line

// Apply authentication to all blog routes
router.use(authenticateToken); // This will protect ALL blog routes

// Or protect specific routes individually:
router.post('/', upload.single('hero_banner'), blogController.createBlog); // Already protected by above middleware
router.get('/', blogController.getAllBlogs); // Public route - remove from authenticateToken if you want this public
router.get('/published', blogController.getPublishedBlogs); // Public route
router.get('/:id', blogController.getBlogById); // Public route

// Admin only routes
router.put('/:id', upload.single('hero_banner'), requireAdmin, blogController.updateBlog);
router.patch('/:id/publish', requireAdmin, blogController.togglePublishStatus);
router.delete('/:id', requireAdmin, blogController.deleteBlog);

module.exports = router;