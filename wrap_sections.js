const fs = require('fs');
const path = require('path');

const dir = 'frontend/src/components/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const sectionsToWrap = {
    'education': 'education',
    'technology': 'skills',
    'experience': 'experience',
    'projects': 'projects',
    'certification': 'certifications'
};

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    for (const [id, visibilityKey] of Object.entries(sectionsToWrap)) {
        const sectionRegex = new RegExp("(<section[^>]*id=[\"']" + id + "[\"'][^>]*>)");
        const match = content.match(sectionRegex);
        
        if (match) {
            const startIndex = match.index;
            let depth = 0;
            let i = startIndex;
            let foundEnd = false;
            
            while (i < content.length) {
                if (content.substring(i, i + 8) === '<section') {
                    depth++;
                    i += 8;
                } else if (content.substring(i, i + 10) === '</section>') {
                    depth--;
                    if (depth === 0) {
                        foundEnd = true;
                        i += 10;
                        break;
                    } else {
                        i += 10;
                    }
                } else {
                    i++;
                }
            }
            
            if (foundEnd) {
                const before = content.substring(0, startIndex);
                const section = content.substring(startIndex, i);
                const after = content.substring(i);
                
                content = before + "{data?.visible?." + visibilityKey + " !== false && (\n" + section + "\n)}" + after;
            }
        }
    }
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Processed', file);
}
