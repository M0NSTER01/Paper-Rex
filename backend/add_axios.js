const fs = require('fs');
let file = 'index.js';
let content = fs.readFileSync(file, 'utf8');
if (!content.includes("require('axios')")) {
    content = "const axios = require('axios');\n" + content;
}
fs.writeFileSync(file, content);
