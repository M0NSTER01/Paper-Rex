const fs = require('fs');

const templates = {
    'MinimalistTemplate.jsx': {
        regex: /<div className="space-y-32">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
        replacement: '<div className="space-y-32">\\n' +
                     '                            {(data?.projects || []).map((proj, index) => (\\n' +
                     '                                <div key={index} className="flex flex-col items-center gap-8">\\n' +
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
                     '                </section>'
    }
};

let file = 'frontend/src/components/templates/MinimalistTemplate.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(templates['MinimalistTemplate.jsx'].regex, templates['MinimalistTemplate.jsx'].replacement.replace(/\\n/g, '\n'));
fs.writeFileSync(file, content);
