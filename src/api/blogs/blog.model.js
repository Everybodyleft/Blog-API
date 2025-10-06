const db = require('../../config/database');

const createBlogTable = async () => {
    try {
        const sql = `
            CREATE TABLE IF NOT EXISTS development_blogs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                hero_banner VARCHAR(500),
                title VARCHAR(255) NOT NULL,
                subtitle VARCHAR(500),
                content TEXT,
                author_name VARCHAR(100) NOT NULL,
                publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_published BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        await db.execute(sql);
        console.log('✅ Development_blogs table created/verified');
    } catch (error) {
        console.error('❌ Error creating blogs table:', error);
    }
};

// Initialize table when model loads
createBlogTable();

module.exports = {
    createBlogTable
};