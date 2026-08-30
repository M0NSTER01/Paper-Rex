const fs = require('fs');
let content = fs.readFileSync('frontend/src/index.css', 'utf8');

const themeUpdates = `
  --color-dark-bg: #0c141a;
  --color-neon-accent: #00ff41;
  --color-neon: #00ff41;
  --color-terminal-bg: #15202b;
  --color-terminal-border: #1e293b;
`;

const extraCSS = `
.theme-midnight-developer .text-neon {
    color: #00ff41;
}
.theme-midnight-developer .bg-neon {
    background-color: #00ff41;
}
.theme-midnight-developer .border-neon {
    border-color: #00ff41;
}
.theme-midnight-developer .terminal-card {
    background-color: #15202b;
    border: 1px solid #1e293b;
}
.theme-midnight-developer .terminal-header {
    background-color: #0c141a;
    border-bottom: 1px solid #1e293b;
}

/* Scrollbar specific to Midnight Developer */
.theme-midnight-developer::-webkit-scrollbar {
    width: 8px;
}
.theme-midnight-developer::-webkit-scrollbar-track {
    background: #0c141a;
}
.theme-midnight-developer::-webkit-scrollbar-thumb {
    background: #1e293b;
    border-radius: 4px;
}
.theme-midnight-developer::-webkit-scrollbar-thumb:hover {
    background: #00ff41;
}
`;

if (!content.includes('--color-terminal-bg')) {
    content = content.replace('}', themeUpdates + '\n}');
    content += '\n' + extraCSS;
    fs.writeFileSync('frontend/src/index.css', content);
}
