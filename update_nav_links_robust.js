const fs = require('fs');
const path = require('path');

const dir = 'frontend/src/components/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const mappings = {
    'education': 'education',
    'technology': 'skills',
    'skills': 'skills',
    'experience': 'experience',
    'projects': 'projects',
    'certification': 'certifications',
    'certifications': 'certifications'
};

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // We will find `<a ` and find its closing `</a>`. Then check if it contains `href="#key"`.
    let newContent = "";
    let i = 0;
    while (i < content.length) {
        let startIdx = content.indexOf('<a ', i);
        if (startIdx === -1) {
            newContent += content.substring(i);
            break;
        }
        
        let endIdx = content.indexOf('</a>', startIdx);
        if (endIdx === -1) {
            newContent += content.substring(i);
            break;
        }
        
        endIdx += 4; // include '</a>'
        
        let aTag = content.substring(startIdx, endIdx);
        let wrapped = false;
        
        // Ensure it's not already wrapped
        let alreadyWrapped = false;
        if (startIdx > 30) {
            let before = content.substring(startIdx - 30, startIdx);
            if (before.includes('!== false && (')) {
                alreadyWrapped = true;
            }
        }
        
        if (!alreadyWrapped) {
            for (const [href, dataKey] of Object.entries(mappings)) {
                if (aTag.includes('href="#' + href + '"')) {
                    aTag = "{data?.visible?." + dataKey + " !== false && ( " + aTag + " )}";
                    wrapped = true;
                    break;
                }
            }
        }
        
        newContent += content.substring(i, startIdx) + aTag;
        i = endIdx;
    }
    
    fs.writeFileSync(path.join(dir, file), newContent);
    console.log("Processed " + file);
}
