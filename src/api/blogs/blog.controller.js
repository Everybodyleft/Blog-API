const db = require('../../config/database');

// Create a new blog post
exports.createBlog = async (req, res) => {
    const operationId = `CREATE_BLOG_${Date.now()}`;
    
    try {
        console.log(`🟢 [${operationId}] Starting blog creation...`);
        const { title, subtitle, content, author_name, is_published } = req.body;
        const hero_banner = req.file ? req.file.filename : null;

        console.log(`📝 [${operationId}] Blog data:`, { 
            title, 
            author_name, 
            has_hero_banner: !!hero_banner,
            is_published 
        });

        // Validation
        if (!title || !content || !author_name) {
            console.warn(`⚠️ [${operationId}] Validation failed: Missing required fields`);
            return res.status(400).json({ 
                error: 'Title, content, and author name are required' 
            });
        }

        console.log(`🛠️ [${operationId}] Executing database insert...`);
        const sql = `
            INSERT INTO development_blogs 
            (hero_banner, title, subtitle, content, author_name, is_published) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.execute(sql, [
            hero_banner, title, subtitle, content, author_name, 
            is_published === 'true' || is_published === true
        ]);

        console.log(`✅ [${operationId}] Blog created successfully! ID: ${result.insertId}`);
        
        res.status(201).json({
            success: true,
            message: 'Blog post created successfully!',
            data: { id: result.insertId }
        });

    } catch (error) {
        console.error(`❌ [${operationId}] Blog creation failed:`, error.message);
        console.error(`🔍 [${operationId}] Error details:`, error);
        
        res.status(500).json({ 
            error: 'Failed to create blog post',
            message: error.message 
        });
    }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    const operationId = `GET_BLOGS_${Date.now()}`;
    
    try {
        console.log(`🟢 [${operationId}] Fetching all blogs...`);
        const sql = `SELECT * FROM development_blogs ORDER BY created_at DESC`;
        const [rows] = await db.execute(sql);
        
        console.log(`✅ [${operationId}] Retrieved ${rows.length} blogs`);
        
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to fetch blogs:`, error.message);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

// Get only published blogs
exports.getPublishedBlogs = async (req, res) => {
    const operationId = `GET_PUBLISHED_${Date.now()}`;
    
    try {
        console.log(`🟢 [${operationId}] Fetching published blogs...`);
        const sql = `SELECT * FROM development_blogs WHERE is_published = true ORDER BY created_at DESC`;
        const [rows] = await db.execute(sql);
        
        console.log(`✅ [${operationId}] Retrieved ${rows.length} published blogs`);
        
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to fetch published blogs:`, error.message);
        res.status(500).json({ error: 'Failed to fetch published blogs' });
    }
};

// Get single blog by ID
exports.getBlogById = async (req, res) => {
    const operationId = `GET_BLOG_${req.params.id}_${Date.now()}`;
    
    try {
        const { id } = req.params;
        console.log(`🟢 [${operationId}] Fetching blog with ID: ${id}`);

        const sql = `SELECT * FROM development_blogs WHERE id = ?`;
        const [rows] = await db.execute(sql, [id]);

        if (rows.length === 0) {
            console.warn(`⚠️ [${operationId}] Blog not found with ID: ${id}`);
            return res.status(404).json({ error: 'Blog post not found' });
        }

        console.log(`✅ [${operationId}] Blog found: "${rows[0].title}"`);
        
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to fetch blog:`, error.message);
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
};

// Update blog post
exports.updateBlog = async (req, res) => {
    const operationId = `UPDATE_BLOG_${req.params.id}_${Date.now()}`;
    
    try {
        const { id } = req.params;
        const { title, subtitle, content, author_name, is_published } = req.body;
        const hero_banner = req.file ? req.file.filename : null;

        console.log(`🟢 [${operationId}] Updating blog ID: ${id}`);
        console.log(`📝 [${operationId}] Update data:`, { title, author_name, is_published });

        const sql = `
            UPDATE development_blogs 
            SET title = ?, subtitle = ?, content = ?, author_name = ?, is_published = ?, hero_banner = COALESCE(?, hero_banner)
            WHERE id = ?
        `;
        
        const [result] = await db.execute(sql, [
            title, subtitle, content, author_name, is_published, hero_banner, id
        ]);

        if (result.affectedRows === 0) {
            console.warn(`⚠️ [${operationId}] Blog not found for update: ${id}`);
            return res.status(404).json({ error: 'Blog post not found' });
        }

        console.log(`✅ [${operationId}] Blog updated successfully`);

        res.json({
            success: true,
            message: 'Blog updated successfully'
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to update blog:`, error.message);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
};

// Toggle publish status
exports.togglePublishStatus = async (req, res) => {
    const operationId = `TOGGLE_PUBLISH_${req.params.id}_${Date.now()}`;
    
    try {
        const { id } = req.params;
        console.log(`🟢 [${operationId}] Toggling publish status for blog ID: ${id}`);

        // First get current status
        const [current] = await db.execute('SELECT is_published FROM development_blogs WHERE id = ?', [id]);
        
        if (current.length === 0) {
            console.warn(`⚠️ [${operationId}] Blog not found with ID: ${id}`);
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const sql = `UPDATE development_blogs SET is_published = NOT is_published WHERE id = ?`;
        await db.execute(sql, [id]);

        console.log(`✅ [${operationId}] Publish status toggled from ${current[0].is_published} to ${!current[0].is_published}`);

        res.json({
            success: true,
            message: 'Publish status updated successfully',
            new_status: !current[0].is_published
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to toggle publish status:`, error.message);
        res.status(500).json({ error: 'Failed to update publish status' });
    }
};

// Delete blog post
exports.deleteBlog = async (req, res) => {
    const operationId = `DELETE_BLOG_${req.params.id}_${Date.now()}`;
    
    try {
        const { id } = req.params;
        console.log(`🟢 [${operationId}] Deleting blog with ID: ${id}`);

        const sql = `DELETE FROM development_blogs WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);

        if (result.affectedRows === 0) {
            console.warn(`⚠️ [${operationId}] Blog not found for deletion: ${id}`);
            return res.status(404).json({ error: 'Blog post not found' });
        }

        console.log(`✅ [${operationId}] Blog deleted successfully`);

        res.json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error(`❌ [${operationId}] Failed to delete blog:`, error.message);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
};