const fs = require('fs');
let c = fs.readFileSync('src/components/templates/DataDrivenTemplate.jsx', 'utf8');

const target = `<button className="px-6 py-2 rounded-lg border-2 border-outline text-on-surface-variant text-label-md font-label-md hover:bg-surface-variant transition-colors flex items-center gap-2">`;
const replacement = `{data?.contact?.github && (
                        <a href={data.contact.github.startsWith("http") ? data.contact.github : "https://" + data.contact.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border-2 border-outline text-on-surface-variant hover:bg-surface-variant transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">code</span>
                        </a>
                    )}
                    {data?.contact?.linkedin && (
                        <a href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : "https://" + data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border-2 border-outline text-on-surface-variant hover:bg-surface-variant transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">link</span>
                        </a>
                    )}
                    <button className="px-6 py-2 rounded-lg border-2 border-outline text-on-surface-variant text-label-md font-label-md hover:bg-surface-variant transition-colors flex items-center gap-2">`;

c = c.replace(target, replacement);
fs.writeFileSync('src/components/templates/DataDrivenTemplate.jsx', c);
console.log('Fixed DataDrivenTemplate');
