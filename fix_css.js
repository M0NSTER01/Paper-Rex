const fs = require('fs');
let content = fs.readFileSync('frontend/src/index.css', 'utf8');

// Replace `--color-xxx: var(--color-xxx, #yyy);` with `--color-xxx: #yyy;`
content = content.replace(/--color-([a-zA-Z0-9-]+):\s*var\(--color-\1,\s*(#[a-fA-F0-9]+)\);/g, '--color-$1: $2;');

fs.writeFileSync('frontend/src/index.css', content);
console.log('Fixed cyclical variables');
