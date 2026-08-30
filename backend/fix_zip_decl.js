const fs = require('fs');

let file = 'index.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /const path = require\('path'\);\s*const os = require\('os'\);\s*zip\.addFile\('build\/index\.html', Buffer\.from\(htmlContent, 'utf8'\)\);/;

const replacement = `const zip = new AdmZip();
        zip.addFile('build/index.html', Buffer.from(htmlContent, 'utf8'));
        const zipBuffer = zip.toBuffer();`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
