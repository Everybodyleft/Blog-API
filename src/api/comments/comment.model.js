const db = require('../../config/database');

const createCommentTable = async () => {
    try {
        const sql = `
            CREATE TABLE IF NOT EXISTS blog_comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                blog_id INT NOT NULL,
                author_name VARCHAR(100) NOT NULL,
                comment_text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (blog_id) REFERENCES development_blogs(id) ON DELETE CASCADE
            )
        `;
        await db.execute(sql);
        console.log('✅ Blog_comments table created/verified');
    } catch (error) {
        console.error('❌ Error creating comments table:', error);
    }
};

// Initialize table when model loads
createCommentTable();

module.exports = {
    createCommentTable
};