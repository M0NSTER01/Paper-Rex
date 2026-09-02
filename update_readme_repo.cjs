const fs = require('fs');

const readmePath = 'README.md';
if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // Replace git clone link
    content = content.replace(/git clone https:\/\/github\.com\/your-username\/paper-rex\.git/g, 'git clone https://github.com/M0NSTER01/Paper-Rex.git');
    
    // Replace cd command
    content = content.replace(/cd paper-rex\n/g, 'cd Paper-Rex\n');
    
    fs.writeFileSync(readmePath, content);
    console.log("Updated README.md repo link");
}
