import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
};

// Create a pool to connect to the database (we will select the DB later)
let pool;

export async function initDb() {
  // First connect without specifying the database to create it if it doesn't exist
  const connection = await mysql.createConnection(dbConfig);
  await connection.query('CREATE DATABASE IF NOT EXISTS pdf_prison');
  await connection.end();

  // Now create the pool with the database specified
  pool = mysql.createPool({
    ...dbConfig,
    database: 'pdf_prison',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Initialize tables
  await createTables();
  console.log('Database initialized successfully.');
}

async function createTables() {
  const connection = await pool.getConnection();
  try {
    // Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Portfolios table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS portfolios (
        id VARCHAR(36) PRIMARY KEY,
        user_id INT NOT NULL,
        template VARCHAR(50) DEFAULT 'developer',
        is_published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Portfolio Versions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS portfolio_versions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        portfolio_id VARCHAR(36) NOT NULL,
        version_number INT NOT NULL,
        content JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
      )
    `);

    // Analytics table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        portfolio_id VARCHAR(36) NOT NULL,
        hit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
      )
    `);
  } finally {
    connection.release();
  }
}

export function getPool() {
  if (!pool) {
    throw new Error('Database not initialized. Call initDb first.');
  }
  return pool;
}
