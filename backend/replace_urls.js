const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('../frontend/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace constants
    content = content.replace(/const API_BASE = 'http:\/\/localhost:5000';/g, "const API_BASE = import.meta.env.VITE_BACKEND_URL;");
    
    // Replace URL inside template literals (e.g., `http://localhost:5000/api...`)
    content = content.replace(/`http:\/\/localhost:5000(.*?)`/g, "`\${import.meta.env.VITE_BACKEND_URL}$1`");
    content = content.replace(/`https:\/\/4zxl3477-5000\.inc1\.devtunnels\.ms(.*?)`/g, "`\${import.meta.env.VITE_BACKEND_URL}$1`");

    // Replace URL inside string literals (e.g., 'http://localhost:5000/api...')
    content = content.replace(/'http:\/\/localhost:5000(.*?)'/g, "`\${import.meta.env.VITE_BACKEND_URL}$1`");
    content = content.replace(/'https:\/\/4zxl3477-5000\.inc1\.devtunnels\.ms(.*?)'/g, "`\${import.meta.env.VITE_BACKEND_URL}$1`");

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
