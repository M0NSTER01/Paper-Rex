const fs = require('fs');

let file = 'frontend/src/components/templates/NeonCreativeTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import ContactForm')) {
    content = content.replace("import React from 'react';", "import React from 'react';\nimport ContactForm from '../ContactForm';");
}

const regex = /<div className="flex flex-col sm:flex-row justify-center gap-4">([\s\S]*?)<\/div>/;
const replacement = '<div className="w-full text-left"><ContactForm toEmail={data?.contact?.email} /></div>';

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
