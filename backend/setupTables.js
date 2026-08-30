const mysql = require('mysql2/promise');

async function setup() {
    try {
        const pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "root",
            database: "secondlife_resume"
        });

        const createPortfoliosTable = `
            CREATE TABLE IF NOT EXISTS portfolios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                theme VARCHAR(50) DEFAULT 'Developer',
                data JSON NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;

        await pool.query(createPortfoliosTable);
        console.log("Table 'portfolios' created or already exists.");

        // Insert some mock data for user id 1 if none exists
        // Wait, I will just let the frontend create them or fetch empty arrays.
        
        await pool.end();
        console.log("Migration complete.");
    } catch (err) {
        console.error(err);
    }
}
setup();
