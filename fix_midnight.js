const fs = require('fs');
let file = 'frontend/src/components/templates/MidnightDeveloperTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<ul className="font-mono text-sm text-slate-300 space-y-4">([\s\S]*?)<\/ul>/;
const replacement = '<ul className="font-mono text-sm text-slate-300 space-y-4">\n' +
                    '                            {(data?.certifications || []).map((cert, index) => (\n' +
                    '                                <li key={index} className="flex justify-between items-center border-b border-[#1e293b] pb-2">\n' +
                    '                                    <div>\n' +
                    '                                        <span className="text-white font-semibold">{cert.title}</span>\n' +
                    '                                        <p className="text-slate-500 text-xs mt-1">{cert.issuer}</p>\n' +
                    '                                    </div>\n' +
                    '                                    <span className="text-neon">{cert.year}</span>\n' +
                    '                                </li>\n' +
                    '                            ))}\n' +
                    '                        </ul>';

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
