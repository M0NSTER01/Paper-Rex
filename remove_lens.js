const fs = require('fs');

let minimalist = fs.readFileSync('frontend/src/components/templates/MinimalistTemplate.jsx', 'utf8');
minimalist = minimalist.replace(/\{\/\* Integrated Recruiter Lens Toggle \*\/\}\s*<div className="hidden xl:flex items-center bg-surface-container-low rounded-full p-1 border border-surface-variant">\s*<button className="lens-btn[^>]+>HR View<\/button>\s*<button className="lens-btn[^>]+>EM View<\/button>\s*<button className="lens-btn[^>]+>TL;DR<\/button>\s*<\/div>/, '');
fs.writeFileSync('frontend/src/components/templates/MinimalistTemplate.jsx', minimalist);

let modern = fs.readFileSync('frontend/src/components/templates/ModernTemplate.jsx', 'utf8');
modern = modern.replace(/\{\/\* Styled Recruiter Lens Segmented Control \*\/\}\s*<div className="hidden lg:flex items-center bg-surface-variant rounded-full p-1 border border-outline-variant\/50">\s*<button className="lens-btn[^>]+>HR View<\/button>\s*<button className="lens-btn[^>]+>EM View<\/button>\s*<button className="lens-btn[^>]+>TL;DR<\/button>\s*<\/div>/, '');
fs.writeFileSync('frontend/src/components/templates/ModernTemplate.jsx', modern);
