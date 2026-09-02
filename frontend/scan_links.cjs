const fs = require('fs');
const path = require('path');
const dir = 'src/components/templates';
const files = fs.readdirSync(dir);

files.forEach(file => {
    let c = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Find common placeholder links that look like social links (e.g. Github, Linkedin)
    // MinimalistTemplate has href="#" and material icons 'link' and 'code'
    if (file === 'MinimalistTemplate.jsx') {
        c = c.replace(/href="#"([^>]*><span className="material-symbols-outlined[^>]*>link<\/span>)/g, 'href={data?.contact?.linkedin || "#"} target="_blank" rel="noopener noreferrer"$1');
        c = c.replace(/href="#"([^>]*><span className="material-symbols-outlined[^>]*>code<\/span>)/g, 'href={data?.contact?.github || "#"} target="_blank" rel="noopener noreferrer"$1');
    }
    
    // Let's print out what links are present
    console.log(file, 'has contact links?', c.includes('data?.contact?.linkedin'), c.includes('data?.contact?.github'));
    fs.writeFileSync(path.join(dir, file), c);
});
