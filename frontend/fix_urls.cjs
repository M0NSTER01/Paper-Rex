const fs = require('fs');
let c = fs.readFileSync('src/pages/Editor.jsx', 'utf8');

// The deployed script Contact Form uses the URL
c = c.replace(/fetch\('https:\/\/4zxl3477-5000\.inc1\.devtunnels\.ms\/api\/contact'/g, "fetch(backendUrl + '/api/contact'");

// The rest of the axios calls
c = c.replace(/'https:\/\/4zxl3477-5000\.inc1\.devtunnels\.ms([^']+)'/g, '`${import.meta.env.VITE_BACKEND_URL}$1`');
c = c.replace(/`https:\/\/4zxl3477-5000\.inc1\.devtunnels\.ms([^`]+)`/g, '`${import.meta.env.VITE_BACKEND_URL}$1`');

fs.writeFileSync('src/pages/Editor.jsx', c);
console.log('Fixed Editor.jsx');
