const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('Chatbot')) {
    content = content.replace(/(import SkillGapAnalysis from '\.\.\/components\/SkillGapAnalysis';)/, "$1\nimport Chatbot from '../components/Chatbot';");
    content = content.replace(/(      <\/div>\s*    \);\s*\})\s*$/, "        {/* Chatbot */}\n        <Chatbot />\n$1");
}

fs.writeFileSync(file, content);
