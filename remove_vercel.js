const fs = require('fs');

let file = 'backend/index.js';
let content = fs.readFileSync(file, 'utf8');

const startMarker = "app.post('/api/deploy', authenticateToken, async (req, res) => {\r\n    const { htmlContent, slug } = req.body;\r\n    \r\n    if (!htmlContent || !slug) {";
const fallbackStartMarker = "app.post('/api/deploy', authenticateToken, async (req, res) => {\n    const { htmlContent, slug } = req.body;\n    \n    if (!htmlContent || !slug) {";

let startIndex = content.indexOf(startMarker);
if (startIndex === -1) startIndex = content.indexOf(fallbackStartMarker);

const endMarker = "res.status(500).json({ error: \"Failed to deploy to Vercel\" });\r\n    }\r\n});";
const fallbackEndMarker = "res.status(500).json({ error: \"Failed to deploy to Vercel\" });\n    }\n});";

let endIndex = content.indexOf(endMarker);
if (endIndex === -1) endIndex = content.indexOf(fallbackEndMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const toRemove = content.substring(startIndex, endIndex + (endMarker.length > fallbackEndMarker.length ? endMarker.length : fallbackEndMarker.length));
    content = content.replace(toRemove, '');
    fs.writeFileSync(file, content);
    console.log("Removed Vercel block");
} else {
    console.log("Could not find markers", startIndex, endIndex);
}
