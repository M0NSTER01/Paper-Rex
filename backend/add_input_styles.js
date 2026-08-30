const fs = require('fs');

let file = '../frontend/src/index.css';
let content = fs.readFileSync(file, 'utf8');

const inputStyles = `
/* Fallback styles for inputs and textareas on deployed sites (since CDN doesn't parse @theme) */
.theme-midnight-developer input, .theme-midnight-developer textarea {
    background-color: #1e293b !important;
    color: #f8fafc !important;
    border-color: #334155 !important;
}
.theme-midnight-developer input:focus, .theme-midnight-developer textarea:focus {
    border-color: #00ff41 !important;
}

.theme-midnight input, .theme-midnight textarea {
    background-color: #1e293b !important;
    color: #f8fafc !important;
    border-color: #334155 !important;
}
.theme-midnight input:focus, .theme-midnight textarea:focus {
    border-color: #8b5cf6 !important;
}

.theme-neon-creative input, .theme-neon-creative textarea {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 2px solid #131b2e !important;
}
.theme-neon-creative input:focus, .theme-neon-creative textarea:focus {
    border-color: #FF4081 !important;
}

.theme-neon input, .theme-neon textarea {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 2px solid #000000 !important;
}
.theme-neon input:focus, .theme-neon textarea:focus {
    border-color: #00BFA5 !important;
}
`;

content = content + '\n' + inputStyles;
fs.writeFileSync(file, content);
