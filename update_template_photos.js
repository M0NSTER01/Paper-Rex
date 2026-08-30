const fs = require('fs');
const path = require('path');

const dir = 'frontend/src/components/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Some templates use src="https://lh3.googleusercontent.com..."
    content = content.replace(/src="(https:\/\/lh3\.googleusercontent\.com[^"]+)"/g, 'src={data?.intro?.photoUrl || "$1"}');
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Processed', file);
}
