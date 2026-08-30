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
    
    for (const [href, dataKey] of Object.entries(mappings)) {
        // Find <a ... href="#HREF" ...>...</a>
        // It's much easier to just do it without regex, but since we have different classes:
        // Let's use a function and match!
        
        const matchRegex = new RegExp('<a[^>]*href="#' + href + '"[^>]*>[\\\\s\\\\S]*?<\\/a>', 'g');
        content = content.replace(matchRegex, (match) => {
            // Check if it's already wrapped to prevent double wrapping
            if (content.includes("{data?.visible?." + dataKey + " !== false && ( " + match + " )}")) return match;
            return "{data?.visible?." + dataKey + " !== false && ( " + match + " )}";
        });
    }
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log("Processed nav for " + file);
}
