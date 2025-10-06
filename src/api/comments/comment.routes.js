const express = require('express');
const router = express.Router();
const commentController = require('./comment.controller');

// Debug: Check if controller functions are available
console.log('Comment Controller Functions:', {
    addComment: typeof commentController.addComment,
    getBlogComments: typeof commentController.getBlogComments,
    getCommentCount: typeof commentController.getCommentCount,
    deleteComment: typeof commentController.deleteComment
});

// Comment Routes
router.post('/', commentController.addComment);
router.get('/blog/:blogId', commentController.getBlogComments);
router.get('/count/:blogId', commentController.getCommentCount);
router.delete('/:id', commentController.deleteComment);

module.exports = router;