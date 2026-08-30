const fs = require('fs');

let file = 'index.js';
let content = fs.readFileSync(file, 'utf8');

// Fix the liveUrl replacement
content = content.replace("res.json({ liveUrl: liveUrl.replace('https://', '') });", "res.json({ liveUrl: liveUrl.replace(/^https?:\\/\\//, '') });");

fs.writeFileSync(file, content);
