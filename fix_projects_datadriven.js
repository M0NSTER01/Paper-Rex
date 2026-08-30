const fs = require('fs');

let file = 'frontend/src/components/templates/DataDrivenTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="grid grid-cols-1 md:grid-cols-2 gap-6">([\s\S]*?)<\/div>\s*<\/section>/;
const replacement = '<div className="grid grid-cols-1 md:grid-cols-2 gap-6">\\n' +
                    '                        {(data?.projects || []).map((proj, index) => (\\n' +
                    '                            <div key={index} className="bg-surface-container-lowest border border-outline rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">\\n' +
                    '                                <h4 className="text-headline-md text-on-surface mb-2">{proj.title}</h4>\\n' +
                    '                                <p className="text-body-md text-on-surface-variant mb-4">{proj.desc}</p>\\n' +
                    '                                <div className="flex gap-2 mb-4 flex-wrap">\\n' +
                    '                                    {(proj.tech || []).map((t, i) => (\\n' +
                    '                                        <span key={i} className="px-2 py-1 text-xs bg-surface-variant rounded text-on-surface">{t}</span>\\n' +
                    '                                    ))}\\n' +
                    '                                </div>\\n' +
                    '                            </div>\\n' +
                    '                        ))}\\n' +
                    '                    </div>\\n' +
                    '                </section>';

content = content.replace(regex, replacement.replace(/\\n/g, '\n'));
fs.writeFileSync(file, content);
