const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const mysql2 = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);

const JWT_SECRET = "YOUR_JWT_SECRET";

// Initialize MySQL Database Connection Pool
const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "YOUR_DB_PASSWORD",
    database: "secondlife_resume"
}).promise();

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        
        const [result] = await pool.query(sql, [name, email, hashedPassword]);
        
        const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: result.insertId, name, email } });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error("Signup error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
        
        if (rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Get User Portfolios
app.get('/api/portfolios', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM portfolios WHERE user_id = ? ORDER BY updated_at DESC', [req.user.id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get Specific Portfolio (Publicly viewable)
app.get('/api/portfolios/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM portfolios WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Create Portfolio
app.post('/api/portfolios', authenticateToken, async (req, res) => {
    const { name, theme } = req.body;
    if (!name) return res.status(400).json({ error: "Portfolio name is required" });

    try {
        const [result] = await pool.query(
            'INSERT INTO portfolios (user_id, name, theme) VALUES (?, ?, ?)',
            [req.user.id, name, theme || 'Minimalist']
        );
        res.json({ id: result.insertId, name, theme: theme || 'Minimalist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update Portfolio Theme
app.put('/api/portfolios/:id', authenticateToken, async (req, res) => {
    const { theme } = req.body;
    try {
        await pool.query('UPDATE portfolios SET theme = ? WHERE id = ? AND user_id = ?', [theme, req.params.id, req.user.id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
