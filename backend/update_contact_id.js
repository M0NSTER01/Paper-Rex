const fs = require('fs');
let file = '../frontend/src/components/ContactForm.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<form onSubmit=\{handleSubmit\}/, '<form id="portfolio-contact-form" data-to-email={toEmail} onSubmit={handleSubmit}');
fs.writeFileSync(file, content);
