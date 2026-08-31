const fs = require('fs');
const file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace '\n' + with '' +
content = content.replace(/'\\n' \+/g, "'' +");

// Replace \n' + with ' +
content = content.replace(/\\n' \+/g, "' +");

// Also replace the \n at the end of chatMessages.innerHTML +=
content = content.replace(/\\n';/g, "';");

fs.writeFileSync(file, content);
console.log('Fixed Editor.jsx newline escape sequences');
