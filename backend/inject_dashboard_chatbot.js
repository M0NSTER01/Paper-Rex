const fs = require('fs');

let file = '../frontend/src/pages/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('Chatbot')) {
    content = content.replace(/(import \{ QRCodeCanvas \} from 'qrcode\.react';)/, "$1\nimport Chatbot from '../components/Chatbot';");
    content = content.replace(/    <\/div>\s*\);\s*\}\s*$/, "\n      <Chatbot />\n    </div>\n  );\n}\n");
}

fs.writeFileSync(file, content);
