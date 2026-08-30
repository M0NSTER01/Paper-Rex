const mysql = require('mysql2/promise');
const fs = require('fs');
async function setup() {
    try {
        const ca = fs.readFileSync('ca.pem');
        const con = await mysql.createConnection({
            host: 'mysql-3c2f6ed-singhchhaya881-0640.k.aivencloud.com',
            port: 24331,
            user: 'avnadmin',
            password: 'YOUR_DB_PASSWORD',
            database: 'secondlife_resume',
            ssl: { ca }
        });
        await con.query(`
            CREATE TABLE IF NOT EXISTS course_recommendations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                portfolio_id INT NOT NULL,
                recommendations_json JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('course_recommendations table created successfully.');
        await con.end();
    } catch (e) {
        console.error(e);
    }
}
setup();
