const fs = require('fs');

let content = fs.readFileSync('backend/index.js', 'utf8');

// Remove the leftover broken code from line 43
content = content.replace(/    \}\n    const photoUrl = 'http:\/\/localhost:5000\/uploads\/' \+ req\.file\.filename;\n    res\.json\(\{ photoUrl \}\);\n\}\);\n\n/, '');

// Now I will properly remove the injected route (which might be duplicated or broken)
// Actually, let me just reconstruct the file perfectly.

const cleanCode = `const express = require("express");
const path = require("path");
const { createServer } = require("http");
const cors = require("cors");
const mysql2 = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const server = createServer(app);

const JWT_SECRET = "YOUR_JWT_SECRET";

// Initialize MySQL Database Connection Pool
const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "YOUR_DB_PASSWORD",
    database: "secondlife_resume"
}).promise();

const upload = multer({ storage: multer.memoryStorage() });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});
const uploadImage = multer({ storage: storage });

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        
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
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        
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

app.post('/api/upload-image', authenticateToken, uploadImage.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const photoUrl = 'http://localhost:5000/uploads/' + req.file.filename;
    res.json({ photoUrl });
});

// Get User Portfolios
app.get('/api/portfolios', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM portfolios WHERE user_id = ? ORDER BY updated_at DESC', [req.user.id]);
        res.json(rows.map(row => {
            if (typeof row.data === 'string') {
                try { row.data = JSON.parse(row.data); } catch (e) {}
            }
            return row;
        }));
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
        const portfolio = rows[0];
        if (typeof portfolio.data === 'string') {
            try { portfolio.data = JSON.parse(portfolio.data); } catch(e) {}
        }
        res.json(portfolio);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Create Portfolio
app.post('/api/portfolios', authenticateToken, async (req, res) => {
    const { name, theme, data } = req.body;
    if (!name) return res.status(400).json({ error: "Portfolio name is required" });

    try {
        const dataJson = data ? JSON.stringify(data) : null;
        const [result] = await pool.query(
            'INSERT INTO portfolios (user_id, name, theme, data) VALUES (?, ?, ?, ?)',
            [req.user.id, name, theme || 'Minimalist', dataJson]
        );
        res.json({ id: result.insertId, name, theme: theme || 'Minimalist', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update Portfolio
app.put('/api/portfolios/:id', authenticateToken, async (req, res) => {
    const { theme, data } = req.body;
    try {
        let updateFields = [];
        let queryParams = [];

        if (theme) {
            updateFields.push('theme = ?');
            queryParams.push(theme);
        }
        if (data) {
            updateFields.push('data = ?');
            queryParams.push(JSON.stringify(data));
        }

        if (updateFields.length === 0) return res.json({ success: true });

        queryParams.push(req.params.id, req.user.id);
        const query = "UPDATE portfolios SET " + updateFields.join(', ') + " WHERE id = ? AND user_id = ?";
        
        await pool.query(query, queryParams);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/api/extract-resume', authenticateToken, upload.single('resume'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const pdfData = await pdfParse(req.file.buffer);
        const text = pdfData.text;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
        const prompt = "Extract the following information from the resume text below and return it strictly as a JSON object matching this structure:\\n{\\n  \\"intro\\": { \\"name\\": \\"\\", \\"title\\": \\"\\", \\"summary\\": \\"\\" },\\n  \\"experience\\": [ { \\"id\\": 1, \\"role\\": \\"\\", \\"company\\": \\"\\", \\"years\\": \\"\\", \\"desc\\": \\"\\" } ],\\n  \\"education\\": [ { \\"id\\": 1, \\"degree\\": \\"\\", \\"school\\": \\"\\", \\"years\\": \\"\\", \\"desc\\": \\"\\" } ],\\n  \\"skills\\": [ \\"Skill 1\\", \\"Skill 2\\" ],\\n  \\"projects\\": [ { \\"id\\": 1, \\"title\\": \\"\\", \\"desc\\": \\"\\", \\"tech\\": [\\"Tech 1\\"] } ],\\n  \\"certifications\\": [ { \\"id\\": 1, \\"title\\": \\"\\", \\"issuer\\": \\"\\", \\"year\\": \\"\\" } ],\\n  \\"contact\\": { \\"email\\": \\"\\", \\"linkedin\\": \\"\\", \\"github\\": \\"\\" },\\n  \\"visible\\": {\\n    \\"education\\": true,\\n    \\"skills\\": true,\\n    \\"experience\\": true,\\n    \\"projects\\": true,\\n    \\"certifications\\": true\\n  }\\n}\\n\\nRules:\\n- For the \\"visible\\" object, set the value to false ONLY IF the section is empty or missing in the resume. Otherwise, set it to true.\\n- Extract as accurately as possible. If something is missing, leave it as an empty string or empty array.\\n- DO NOT wrap the output in markdown code blocks like \`\`\`json. Return ONLY the raw JSON string.\\n\\nResume Text:\\n" + text;
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        
        let jsonStr = responseText;
        if (jsonStr.startsWith('\`\`\`json')) {
            jsonStr = jsonStr.replace(/^\`\`\`json\\n/, '').replace(/\\n\`\`\`$/, '');
        } else if (jsonStr.startsWith('\`\`\`')) {
            jsonStr = jsonStr.replace(/^\`\`\`\\n/, '').replace(/\\n\`\`\`$/, '');
        }

        const parsedData = JSON.parse(jsonStr);
        res.json(parsedData);
    } catch (err) {
        console.error("Extraction error:", err);
        res.status(500).json({ error: "Error extracting resume data" });
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
`;

fs.writeFileSync('backend/index.js', cleanCode);
