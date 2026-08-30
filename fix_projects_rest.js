const fs = require('fs');

// Midnight Developer
let midFile = 'frontend/src/components/templates/MidnightDeveloperTemplate.jsx';
let midContent = fs.readFileSync(midFile, 'utf8');

const midRegex = /<div className="grid grid-cols-1 md:grid-cols-2 gap-6">([\s\S]*?)<\/div>\s*<\/section>/;
const midReplacement = '<div className="grid grid-cols-1 md:grid-cols-2 gap-6">\\n' +
                       '                            {(data?.projects || []).map((proj, index) => (\\n' +
                       '                                <article key={index} className="terminal-card rounded-lg overflow-hidden p-6 hover:border-neon transition-colors">\\n' +
                       '                                    <h3 className="text-lg font-mono text-white font-semibold mb-2">{proj.title}</h3>\\n' +
                       '                                    <p className="text-sm font-body-md text-slate-400 mb-4">{proj.desc}</p>\\n' +
                       '                                    <div className="flex gap-2 font-mono text-xs text-neon flex-wrap">\\n' +
                       '                                        {(proj.tech || []).map((t, i) => (\\n' +
                       '                                            <span key={i}>#{t}</span>\\n' +
                       '                                        ))}\\n' +
                       '                                    </div>\\n' +
                       '                                </article>\\n' +
                       '                            ))}\\n' +
                       '                        </div>\\n' +
                       '                    </section>';

midContent = midContent.replace(midRegex, midReplacement.replace(/\\n/g, '\n'));
fs.writeFileSync(midFile, midContent);


// Neon Creative
let neonFile = 'frontend/src/components/templates/NeonCreativeTemplate.jsx';
let neonContent = fs.readFileSync(neonFile, 'utf8');

const neonRegex = /<div className="grid grid-cols-1 md:grid-cols-2 gap-8">([\s\S]*?)<\/div>\s*<\/section>/;
const neonReplacement = '<div className="grid grid-cols-1 md:grid-cols-2 gap-8">\\n' +
                        '                        {(data?.projects || []).map((proj, index) => (\\n' +
                        '                            <div key={index} className="bg-surface-container-lowest brutal-border shadow-brutal flex flex-col group hover:-translate-y-2 transition-transform duration-300">\\n' +
                        '                                <div className="h-48 bg-pink border-b-4 border-on-surface flex items-center justify-center relative overflow-hidden">\\n' +
                        '                                    <span className="text-display font-display font-extrabold text-on-surface transform -rotate-12 opacity-50 absolute scale-150">{proj.title.substring(0, 10).toUpperCase()}</span>\\n' +
                        '                                </div>\\n' +
                        '                                <div className="p-6 md:p-8 flex-1 flex flex-col">\\n' +
                        '                                    <h3 className="text-headline-md font-headline-md font-extrabold text-on-surface mb-4 uppercase">{proj.title}</h3>\\n' +
                        '                                    <p className="text-body-md font-bold text-on-surface-variant mb-6">{proj.desc}</p>\\n' +
                        '                                    <div className="flex flex-wrap gap-2 mt-auto">\\n' +
                        '                                        {(proj.tech || []).map((t, i) => (\\n' +
                        '                                            <span key={i} className="px-3 py-1 bg-surface-container-low text-on-surface font-bold text-sm uppercase brutal-border">{t}</span>\\n' +
                        '                                        ))}\\n' +
                        '                                    </div>\\n' +
                        '                                </div>\\n' +
                        '                            </div>\\n' +
                        '                        ))}\\n' +
                        '                    </div>\\n' +
                        '                </section>';

neonContent = neonContent.replace(neonRegex, neonReplacement.replace(/\\n/g, '\n'));
fs.writeFileSync(neonFile, neonContent);

