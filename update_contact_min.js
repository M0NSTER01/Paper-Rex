const fs = require('fs');

let file = 'frontend/src/components/templates/MinimalistTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import ContactForm')) {
    content = content.replace("import React from 'react';", "import React from 'react';\nimport ContactForm from '../ContactForm';");
}

const regex = /<form className="bg-surface p-8 md:p-12 rounded-2xl border border-surface-variant shadow-sm max-w-2xl mx-auto space-y-6">([\s\S]*?)<\/form>/;
const replacement = '<div className="bg-surface p-8 md:p-12 rounded-2xl border border-surface-variant shadow-sm max-w-2xl mx-auto"><ContactForm toEmail={data?.contact?.email} /></div>';

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
