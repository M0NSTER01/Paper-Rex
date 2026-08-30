const fs = require('fs');

let file = 'index.js';
let content = fs.readFileSync(file, 'utf8');

// Find a good spot to insert the DELETE route
// I can put it right after the PUT /api/portfolios/:id route

const putRouteRegex = /app\.put\('\/api\/portfolios\/:id'[\s\S]*?\}\);/;

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

content = content.replace(putRouteRegex, match => match + '\n' + deleteRoute);

fs.writeFileSync(file, content);
