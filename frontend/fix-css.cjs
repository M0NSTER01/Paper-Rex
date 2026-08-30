const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/theme\(['"]colors\.([^'"]+)['"]\)/g, 'var(--color-$1)');
fs.writeFileSync('src/index.css', css);
console.log('Fixed theme() functions');
