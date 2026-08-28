import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const buffer = fs.readFileSync('real.pdf');
pdfParse(buffer).then(data => {
  console.log('Parsed successfully:', data.text.substring(0, 50));
}).catch(err => {
  console.error('Error parsing PDF:', err);
});
