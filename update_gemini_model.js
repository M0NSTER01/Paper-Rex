const fs = require('fs');

let file = 'backend/index.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /gemini-2\.5-flash-lite/g;
const replacement = 'gemini-3.5-flash-lite';

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
