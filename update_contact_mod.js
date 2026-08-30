const fs = require('fs');

let file = 'frontend/src/components/templates/ModernTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import ContactForm')) {
    content = content.replace("import React from 'react';", "import React from 'react';\nimport ContactForm from '../ContactForm';");
}

const regex = /<a className="px-8 py-4 rounded-xl bg-primary text-on-primary text-label-md font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-lg flex items-center gap-2" href="mailto:hello@example\.com">[\s\S]*?<\/a>/;
const replacement = '<div className="w-full text-left mt-8"><ContactForm toEmail={data?.contact?.email} /></div>';

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
