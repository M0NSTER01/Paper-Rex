const fs = require('fs');

let ats = fs.readFileSync('src/components/templates/ATSClassicTemplate.jsx', 'utf8');
ats = ats.replace(/<span>\{data\.contact\.linkedin\}<\/span>/g, '<a href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : "https://" + data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.contact.linkedin.replace(/^https?:\\/\\/(www\\.)?/, "")}</a>');
ats = ats.replace(/<span>\{data\.contact\.github\}<\/span>/g, '<a href={data.contact.github.startsWith("http") ? data.contact.github : "https://" + data.contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.contact.github.replace(/^https?:\\/\\/(www\\.)?/, "")}</a>');
fs.writeFileSync('src/components/templates/ATSClassicTemplate.jsx', ats);
console.log('Fixed ATSClassicTemplate');

let modTech = fs.readFileSync('src/components/templates/ModernTechTemplate.jsx', 'utf8');
modTech = modTech.replace(/<span className="break-all">\{data\.contact\.linkedin\}<\/span>/g, '<a href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : "https://" + data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="break-all hover:text-white hover:underline transition-colors">{data.contact.linkedin.replace(/^https?:\\/\\/(www\\.)?/, "")}</a>');
modTech = modTech.replace(/<span className="break-all">\{data\.contact\.github\}<\/span>/g, '<a href={data.contact.github.startsWith("http") ? data.contact.github : "https://" + data.contact.github} target="_blank" rel="noopener noreferrer" className="break-all hover:text-white hover:underline transition-colors">{data.contact.github.replace(/^https?:\\/\\/(www\\.)?/, "")}</a>');
fs.writeFileSync('src/components/templates/ModernTechTemplate.jsx', modTech);
console.log('Fixed ModernTechTemplate');

