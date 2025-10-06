const db = require('../../config/database');

// Add a new comment to a blog post
exports.addComment = async (req, res) => {
    const operationId = `ADD_COMMENT_${Date.now()}`;
    
    try {
        console.log(`🟢 [${operationId}] Adding new comment...`);
        const { blog_id, author_name, comment_text } = req.body;

        // Validation
        if (!blog_id || !author_name || !comment_text) {
            console.warn(`⚠️ [${operationId}] Validation failed: Missing required fields`);
            return res.status(400).json({ 
                error: 'Blog ID, author name, and comment text are required' 
            });
        }

        // Verify blog exists
        const [blog] = await db.execute(
            'SELECT id FROM development_blogs WHERE id = ? AND is_published = true', 
            [blog_id]
        );

        if (blog.length === 0) {
            console.warn(`⚠️ [${operationId}] Blog not found or not published: ${blog_id}`);
            return res.status(404).json({ 
                error: 'Blog post not found or not published' 
            });
        }

        const sql = `
            INSERT INTO blog_comments (blog_id, author_name, comment_text) 
            VALUES (?, ?, ?)
        `;
        
        const [result] = await db.execute(sql, [blog_id, author_name, comment_text]);

        console.log(`✅ [${operationId}] Comment added successfully! ID: ${result.insertId}`);
        
        res.status(201).json({
            success: true,
            message: 'Comment added successfully!',
            data: { 
                id: result.insertId,
                blog_id,
                author_name,
                comment_text,
                created_at: new Date()
            }
        });

    } catch (error) {
        console.error(`❌ [${operationId}] Failed to add comment:`, error.message);
        res.status(500).json({ 
            error: 'Failed to add comment',
            message: error.message 
        });
    }
};

// Get all comments for a specific blog post
exports.getBlogComments = async (req, res) => {
    const operationId = `GET_COMMENTS_${Date.now()}`;
    
    try {
        const { blogId } = req.params;
        console.log(`🟢 [${operationId}] Fetching comments for blog ID: ${blogId}`);

        const sql = `
            SELECT * FROM blog_comments 
            WHERE blog_id = ? 
            ORDER BY created_at DESC
        `;
        
        const [rows] = await db.execute(sql, [blogId]);

        console.log(`✅ [${operationId}] Retrieved ${rows.length} comments for blog ${blogId}`);
        
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to fetch comments:`, error.message);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

// Get comment count for a blog post
exports.getCommentCount = async (req, res) => {
    const operationId = `COMMENT_COUNT_${Date.now()}`;
    
    try {
        const { blogId } = req.params;
        console.log(`🟢 [${operationId}] Getting comment count for blog: ${blogId}`);

        const sql = `SELECT COUNT(*) as comment_count FROM blog_comments WHERE blog_id = ?`;
        const [rows] = await db.execute(sql, [blogId]);

        console.log(`✅ [${operationId}] Comment count: ${rows[0].comment_count}`);
        
        res.json({
            success: true,
            data: {
                blog_id: parseInt(blogId),
                comment_count: rows[0].comment_count
            }
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to fetch comment count:`, error.message);
        res.status(500).json({ error: 'Failed to fetch comment count' });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    const operationId = `DELETE_COMMENT_${req.params.id}_${Date.now()}`;
    
    try {
        const { id } = req.params;
        console.log(`🟢 [${operationId}] Deleting comment with ID: ${id}`);

        const sql = `DELETE FROM blog_comments WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);

        if (result.affectedRows === 0) {
            console.warn(`⚠️ [${operationId}] Comment not found: ${id}`);
            return res.status(404).json({ error: 'Comment not found' });
        }

        console.log(`✅ [${operationId}] Comment deleted successfully`);

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to delete comment:`, error.message);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};