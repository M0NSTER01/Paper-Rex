const fs = require('fs');

const files = [
    'backend/index.js',
    'frontend/src/pages/Auth.jsx',
    'frontend/src/pages/Dashboard.jsx',
    'frontend/src/pages/Editor.jsx',
    'frontend/src/pages/Portfolio.jsx'
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/http:\/\/localhost:5000/g, 'https://4zxl3477-5000.inc1.devtunnels.ms');
    fs.writeFileSync(file, content);
    console.log("Updated " + file);
}
