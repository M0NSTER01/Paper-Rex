const fs = require('fs');
let c = fs.readFileSync('src/components/templates/ModernTemplate.jsx', 'utf8');

c = c.replace(/<a className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href="#">\s*<span className="material-symbols-outlined text-2xl">code<\/span>\s*<\/a>/, 
`{data?.contact?.github && (
                                      <a className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href={data.contact.github.startsWith("http") ? data.contact.github : "https://" + data.contact.github} target="_blank" rel="noopener noreferrer">
                                          <span className="material-symbols-outlined text-2xl">code</span>
                                      </a>
                                  )}`);

c = c.replace(/<a className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href="#">\s*<span className="material-symbols-outlined text-2xl">link<\/span>\s*<\/a>/, 
`{data?.contact?.linkedin && (
                                      <a className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : "https://" + data.contact.linkedin} target="_blank" rel="noopener noreferrer">
                                          <span className="material-symbols-outlined text-2xl">link</span>
                                      </a>
                                  )}`);

fs.writeFileSync('src/components/templates/ModernTemplate.jsx', c);
console.log('Fixed ModernTemplate');
