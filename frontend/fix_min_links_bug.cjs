const fs = require('fs');
let c = fs.readFileSync('src/components/templates/MinimalistTemplate.jsx', 'utf8');

c = c.replace(/href=\{data\?\.contact\?\.linkedin \|\| "#"\}/g, 'href={data?.contact?.linkedin ? (data.contact.linkedin.startsWith("http") ? data.contact.linkedin : "https://" + data.contact.linkedin) : "#"}');
c = c.replace(/href=\{data\?\.contact\?\.github \|\| "#"\}/g, 'href={data?.contact?.github ? (data.contact.github.startsWith("http") ? data.contact.github : "https://" + data.contact.github) : "#"}');

fs.writeFileSync('src/components/templates/MinimalistTemplate.jsx', c);
console.log('Fixed MinimalistTemplate links');
