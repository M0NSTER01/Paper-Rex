const fs = require('fs');
let c = fs.readFileSync('src/components/templates/MidnightDeveloperTemplate.jsx', 'utf8');

const target = `<button className="border border-neon text-neon hover:bg-neon hover:text-black px-4 py-2 rounded-md font-label-md text-label-md transition-colors shadow-sm font-mono">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">download</span> resume.pdf
                      </button>`;
const replacement = `<div className="hidden sm:flex items-center gap-3 mr-4">
                          {data?.contact?.github && (
                              <a href={data.contact.github.startsWith("http") ? data.contact.github : "https://" + data.contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-neon transition-colors" title="GitHub">
                                  <span className="material-symbols-outlined">code</span>
                              </a>
                          )}
                          {data?.contact?.linkedin && (
                              <a href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : "https://" + data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-neon transition-colors" title="LinkedIn">
                                  <span className="material-symbols-outlined">work</span>
                              </a>
                          )}
                      </div>
                      <button className="border border-neon text-neon hover:bg-neon hover:text-black px-4 py-2 rounded-md font-label-md text-label-md transition-colors shadow-sm font-mono">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">download</span> resume.pdf
                      </button>`;

c = c.replace(target, replacement);
fs.writeFileSync('src/components/templates/MidnightDeveloperTemplate.jsx', c);
console.log('Fixed MidnightDeveloperTemplate');
