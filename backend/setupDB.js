const mysql = require('mysql2/promise');

async function setup() {
    try {
        console.log("Connecting to MySQL to create database...");
        // Connect without a specific database first
        const con = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Raghav@159369"
        });

        await con.query("CREATE DATABASE IF NOT EXISTS secondlife_resume");
        console.log("Database 'secondlife_resume' created or already exists.");
        await con.end();

        // Now connect to the newly created database to create tables
        const pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "Raghav@159369",
            database: "secondlife_resume"
        });

        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await pool.query(createUsersTable);
        console.log("Table 'users' created or already exists.");
        await pool.end();

        console.log("Database setup complete!");
    } catch (err) {
        console.error("Error setting up database:", err);
    }
}

setup();
