const fs = require('fs');

let file = 'backend/index.js';
let content = fs.readFileSync(file, 'utf8');

const replacement = `const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Missing Google token" });

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        // Check if user exists
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        let userId;

        if (rows.length === 0) {
            // Create user
            const dummyPassword = await bcrypt.hash(Math.random().toString(36), 10);
            const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            const [result] = await pool.query(sql, [name, email, dummyPassword]);
            userId = result.insertId;
        } else {
            userId = rows[0].id;
        }

        const jwtToken = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token: jwtToken, user: { id: userId, name, email } });
    } catch (err) {
        console.error("Google auth error:", err);
        res.status(500).json({ error: "Google authentication failed" });
    }
});

// Auth Middleware`;

content = content.replace('// Auth Middleware', replacement);
fs.writeFileSync(file, content);
