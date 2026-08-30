const fs = require('fs');
let file = 'frontend/src/components/templates/NeonCreativeTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="grid md:grid-cols-2 gap-8">([\s\S]*?)<\/div>\s*<\/section>/;
const replacement = '<div className="grid md:grid-cols-2 gap-8">\n' +
                    '                        {(data?.certifications || []).map((cert, index) => (\n' +
                    '                            <div key={index} className="bg-surface-container-lowest brutal-border shadow-brutal p-6 flex items-center gap-6 group hover:-translate-x-2 transition-transform">\n' +
                    '                                <div className="w-16 h-16 bg-yellow brutal-border flex items-center justify-center shrink-0">\n' +
                    '                                    <span className="material-symbols-outlined text-headline-lg">verified</span>\n' +
                    '                                </div>\n' +
                    '                                <div>\n' +
                    '                                    <h3 className="text-headline-md font-headline-md font-extrabold text-on-surface">{cert.title}</h3>\n' +
                    '                                    <p className="text-body-md font-bold text-on-surface-variant">{cert.issuer} • {cert.year}</p>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        ))}\n' +
                    '                    </div>\n' +
                    '                </section>';

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
