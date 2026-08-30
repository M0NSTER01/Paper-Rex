const fs = require('fs');
let file = 'index.js';
let content = fs.readFileSync(file, 'utf8');
const regex = /const tempDir = fs\.mkdtempSync[\s\S]*?fs\.rmSync\(tempDir, \{ recursive: true, force: true \}\);/;
const replacement = `zip.addFile('build/index.html', Buffer.from(htmlContent, 'utf8'));`;
content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
