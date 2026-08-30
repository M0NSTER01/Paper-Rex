const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/Editor.jsx', 'utf8');
content = content.replace(/Deploy to Vercel/g, 'Deploy to Netlify');
content = content.replace(/Failed to deploy to Vercel/g, 'Failed to deploy to Netlify');
fs.writeFileSync('frontend/src/pages/Editor.jsx', content);
