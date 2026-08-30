const fs = require('fs');
let file = 'frontend/src/components/templates/ModernTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">([\s\S]*?)<\/div>\s*<\/section>/;
const replacement = '<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">\\n' +
                    '                        {(data?.projects || []).map((proj, index) => (\\n' +
                    '                            <div key={index} className="bento-card p-8 flex flex-col gap-4">\\n' +
                    '                                <h4 className="text-headline-md font-headline-md text-on-surface">{proj.title}</h4>\\n' +
                    '                                <p className="text-body-md font-body-md text-on-surface-variant">{proj.desc}</p>\\n' +
                    '                                <div className="flex gap-2 mt-auto pt-4 flex-wrap">\\n' +
                    '                                    {(proj.tech || []).map((t, i) => (\\n' +
                    '                                        <span key={i} className="text-label-md font-label-md bg-secondary/10 text-secondary px-3 py-1 rounded-full">{t}</span>\\n' +
                    '                                    ))}\\n' +
                    '                                </div>\\n' +
                    '                            </div>\\n' +
                    '                        ))}\\n' +
                    '                    </div>\\n' +
                    '                </section>';

content = content.replace(regex, replacement.replace(/\\n/g, '\n'));
fs.writeFileSync(file, content);
