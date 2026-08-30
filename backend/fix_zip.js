const fs = require('fs');

let file = 'index.js';
let content = fs.readFileSync(file, 'utf8');

const regexZip = /const zip = new AdmZip\(\);\s*zip\.addFile\('index\.html', Buffer\.from\(htmlContent, 'utf8'\)\);\s*const zipBuffer = zip\.toBuffer\(\);/;

const replacementZip = `const path = require('path');
        const os = require('os');
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'netlify-deploy-'));
        fs.writeFileSync(path.join(tempDir, 'index.html'), htmlContent, 'utf8');
        
        const zip = new AdmZip();
        zip.addLocalFolder(tempDir);
        const zipBuffer = zip.toBuffer();
        
        // Clean up
        fs.rmSync(tempDir, { recursive: true, force: true });`;

content = content.replace(regexZip, replacementZip);
fs.writeFileSync(file, content);
