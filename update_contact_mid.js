const fs = require('fs');

let file = 'frontend/src/components/templates/MidnightDeveloperTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import ContactForm')) {
    content = content.replace("import React from 'react';", "import React from 'react';\nimport ContactForm from '../ContactForm';");
}

const regex = /<a className="inline-block border border-neon text-neon hover:bg-neon hover:text-black px-8 py-3 rounded-md font-mono transition-colors" href="mailto:hello@midnightdeveloper\.com">[\s\S]*?<\/a>/;
const replacement = '<div className="w-full text-left mt-8"><ContactForm toEmail={data?.contact?.email} /></div>';

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
