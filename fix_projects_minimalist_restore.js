const fs = require('fs');

let file = 'frontend/src/components/templates/MinimalistTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="space-y-32">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
const replacement = '<div className="space-y-32">\\n' +
                    '                            {(data?.projects || []).map((proj, index) => (\\n' +
                    '                                <div key={index} className="flex flex-col items-center gap-8">\\n' +
                    '                                    <div className="w-full aspect-[16/9] bg-surface-container-high rounded-sm overflow-hidden shadow-lg border border-surface-variant relative group">\\n' +
                    '                                        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">\\n' +
                    '                                            <span className="text-on-surface-variant font-serif italic text-lg">[ High-Resolution Project Image Placeholder ]</span>\\n' +
                    '                                        </div>\\n' +
                    '                                    </div>\\n' +
                    '                                    <div className="text-center max-w-2xl">\\n' +
                    '                                        <h4 className="text-2xl font-serif font-bold text-on-surface mb-4">{proj.title}</h4>\\n' +
                    '                                        <p className="text-on-surface-variant font-light text-lg mb-4">{proj.desc}</p>\\n' +
                    '                                        <div className="flex justify-center flex-wrap gap-2">\\n' +
                    '                                            {(proj.tech || []).map((t, i) => (\\n' +
                    '                                                <span key={i} className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-sm rounded-full">{t}</span>\\n' +
                    '                                            ))}\\n' +
                    '                                        </div>\\n' +
                    '                                    </div>\\n' +
                    '                                </div>\\n' +
                    '                            ))}\\n' +
                    '                        </div>\\n' +
                    '                    </div>\\n' +
                    '                </section>';

content = content.replace(regex, replacement.replace(/\\n/g, '\n'));
fs.writeFileSync(file, content);
