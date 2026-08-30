const fs = require('fs');
let file = 'frontend/src/components/templates/ModernTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');
const regex = /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">([\s\S]*?)<\/div>\s*<\/section>/;
const replacement = '<div className="grid grid-cols-1 md:grid-cols-3 gap-6">\n' +
                    '                        {(data?.certifications || []).map((cert, index) => (\n' +
                    '                            <div key={index} className="bento-card p-6 flex items-center gap-4">\n' +
                    '                                <span className="material-symbols-outlined text-primary text-3xl">workspace_premium</span>\n' +
                    '                                <div>\n' +
                    '                                    <h4 className="text-label-md font-label-md text-on-surface">{cert.title}</h4>\n' +
                    '                                    <p className="text-mono font-mono text-on-surface-variant mt-1">{cert.issuer} ({cert.year})</p>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        ))}\n' +
                    '                    </div>\n' +
                    '                </section>';
content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
