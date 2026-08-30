const fs = require('fs');
let file = 'index.js';
let content = fs.readFileSync(file, 'utf8');

const deleteRoute = `
// Delete Portfolio
app.delete('/api/portfolios/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM portfolios WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
`;

content = content.replace("app.post('/api/extract-resume'", deleteRoute + "\napp.post('/api/extract-resume'");

fs.writeFileSync(file, content);
