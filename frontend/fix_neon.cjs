const fs = require('fs');
let c = fs.readFileSync('src/components/templates/NeonCreativeTemplate.jsx', 'utf8');

const target = `<p className="text-body-lg mb-8 font-medium">Currently open for new opportunities or freelance projects. Send me a message and I'll get back to you soon.</p>`;
const replacement = `<p className="text-body-lg mb-8 font-medium">Currently open for new opportunities or freelance projects. Send me a message and I'll get back to you soon.</p>
                                  <div className="flex justify-center gap-6 mb-10">
                                      {data?.contact?.linkedin && (
                                          <a href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : "https://" + data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-label-md font-label-md font-bold text-on-surface bg-surface-container-lowest brutal-border px-6 py-2 shadow-brutal sticker uppercase flex items-center gap-2 hover:bg-amber transition-colors">
                                              <span>IN</span> LinkedIn
                                          </a>
                                      )}
                                      {data?.contact?.github && (
                                          <a href={data.contact.github.startsWith("http") ? data.contact.github : "https://" + data.contact.github} target="_blank" rel="noopener noreferrer" className="text-label-md font-label-md font-bold text-on-surface bg-surface-container-lowest brutal-border px-6 py-2 shadow-brutal sticker uppercase flex items-center gap-2 hover:bg-teal transition-colors">
                                              <span className="material-symbols-outlined text-sm">code</span> GitHub
                                          </a>
                                      )}
                                  </div>`;

c = c.replace(target, replacement);
fs.writeFileSync('src/components/templates/NeonCreativeTemplate.jsx', c);
console.log('Fixed NeonCreativeTemplate');
