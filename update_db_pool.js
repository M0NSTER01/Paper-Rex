const fs = require('fs');

let file = 'backend/index.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /const pool = mysql2\.createPool\(\{[\s\S]*?\}\)\.promise\(\);/;
const replacement = `const fs = require('fs');
const pool = mysql2.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "YOUR_DB_PASSWORD",
    database: process.env.DB_NAME || "secondlife_resume",
    ssl: {
        ca: fs.readFileSync(__dirname + '/ca.pem')
    }
}).promise();`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
