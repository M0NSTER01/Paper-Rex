const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('<Chatbot />')) {
    content = content.replace(/    <\/div>\s*\);\s*\}\s*$/, "\n      <Chatbot />\n    </div>\n  );\n}\n");
}

fs.writeFileSync(file, content);
