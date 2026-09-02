const fs = require('fs');

const filesToUpdate = ['README.md', '.env.example'];

filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Replace exact match "Khalsa" with "Paper Rex"
        content = content.replace(/Khalsa/g, 'Paper Rex');
        // Replace lowercase "khalsa" with "paper-rex" (e.g. for repo links, db names, urls)
        content = content.replace(/khalsa_db/g, 'paper_rex_db');
        content = content.replace(/khalsa-api/g, 'paper-rex-api');
        content = content.replace(/khalsa/g, 'paper-rex');
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
