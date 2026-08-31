const fs = require('fs');
const mysql = require('mysql2/promise');

async function test() {
    const con = await mysql.createConnection({
        host: 'mysql-3c2f6ed-singhchhaya881-0640.k.aivencloud.com',
        user: 'avnadmin',
        password: 'YOUR_DB_PASSWORD',
        port: 24331,
        database: 'secondlife_resume'
    });
    const [rows] = await con.query('SELECT * FROM portfolios');
    const data = rows[0].data;

    let c = fs.readFileSync('../frontend/src/pages/Editor.jsx', 'utf8');
    const startMarker = 'const htmlContent = `';
    let start = c.indexOf(startMarker);
    if (start === -1) {
        start = c.indexOf('let htmlContent = `');
        if (start !== -1) start += 19;
    } else {
        start += 21;
    }
    
    // Find the closing backtick of htmlContent
    let end = start;
    let found = false;
    while(end < c.length) {
        if (c[end] === '`' && c[end-1] !== '\\') {
            found = true;
            break;
        }
        end++;
    }

    if (!found) {
        console.log('Not found end');
        return;
    }

    let m = c.substring(start, end);
    // Replace import.meta.env
    m = m.replace(/import\.meta\.env\.VITE_BACKEND_URL/g, '"http://localhost:5000"');
    
    try {
        let html = eval('`' + m + '`');
        fs.writeFileSync('test.html', html);
        console.log('Wrote test.html', html.split('\n').length, 'lines');
    } catch (e) {
        console.error(e);
        fs.writeFileSync('test.txt', '`' + m + '`');
    }

    con.end();
}

test();
