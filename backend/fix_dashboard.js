const fs = require('fs');

let file = '../frontend/src/pages/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Deployed on Vercel/g, 'Live on Netlify');

fs.writeFileSync(file, content);
