const fs = require('fs');

let file = 'frontend/src/components/templates/DataDrivenTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import ContactForm')) {
    content = content.replace("import React from 'react';", "import React from 'react';\nimport ContactForm from '../ContactForm';");
}

const regex = /<a className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md" href="mailto:alex@example\.com">[\s\S]*?<\/a>/;
const replacement = '<ContactForm toEmail={data?.contact?.email} />';

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
