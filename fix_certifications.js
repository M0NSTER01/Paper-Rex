const fs = require('fs');
const path = require('path');

const templates = {
    'MinimalistTemplate.jsx': {
        regex: /<div className="grid md:grid-cols-2 gap-6">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/,
        replacement: '<div className="grid md:grid-cols-2 gap-6">\n' +
                     '                            {(data?.certifications || []).map((cert, index) => (\n' +
                     '                                <div key={index} className="flex items-start gap-4 p-6 bg-surface-bright rounded-xl border border-surface-variant shadow-sm">\n' +
                     '                                    <div className="p-3 bg-surface-container-low rounded-full text-primary shrink-0">\n' +
                     '                                        <span className="material-symbols-outlined">verified</span>\n' +
                     '                                    </div>\n' +
                     '                                    <div>\n' +
                     '                                        <h4 className="font-serif font-bold text-on-surface mb-1">{cert.title}</h4>\n' +
                     '                                        <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>\n' +
                     '                                        <p className="text-xs text-on-surface-variant uppercase tracking-wide">Issued: {cert.year}</p>\n' +
                     '                                    </div>\n' +
                     '                                </div>\n' +
                     '                            ))}\n' +
                     '                        </div>\n' +
                     '                    </div>\n' +
                     '                </section>'
    },
    'ModernTemplate.jsx': {
        regex: /<div className="flex flex-wrap gap-4">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/,
        replacement: '<div className="flex flex-wrap gap-4">\n' +
                     '                        {(data?.certifications || []).map((cert, index) => (\n' +
                     '                            <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-surface-container shadow-sm flex-1 min-w-[300px]">\n' +
                     '                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">\n' +
                     '                                    <span className="material-symbols-outlined">workspace_premium</span>\n' +
                     '                                </div>\n' +
                     '                                <div>\n' +
                     '                                    <h4 className="font-bold text-on-surface text-sm">{cert.title}</h4>\n' +
                     '                                    <p className="text-xs text-on-surface-variant">{cert.issuer} &bull; {cert.year}</p>\n' +
                     '                                </div>\n' +
                     '                            </div>\n' +
                     '                        ))}\n' +
                     '                    </div>\n' +
                     '                </div>\n' +
                     '            </section>'
    },
    'DataDrivenTemplate.jsx': {
        regex: /<div className="space-y-4">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/,
        replacement: '<div className="space-y-4">\n' +
                     '                        {(data?.certifications || []).map((cert, index) => (\n' +
                     '                            <div key={index} className="bg-surface-container-lowest border border-outline rounded-xl p-6 flex justify-between items-center shadow-sm">\n' +
                     '                                <div>\n' +
                     '                                    <h4 className="text-headline-md text-on-surface">{cert.title}</h4>\n' +
                     '                                    <p className="text-body-md text-on-surface-variant">{cert.issuer}</p>\n' +
                     '                                </div>\n' +
                     '                                <span className="text-label-md text-primary bg-primary-fixed px-3 py-1 rounded-full">{cert.year}</span>\n' +
                     '                            </div>\n' +
                     '                        ))}\n' +
                     '                    </div>\n' +
                     '                </div>\n' +
                     '            </section>'
    },
    'CleanAcademicTemplate.jsx': {
        regex: /<div className="space-y-6">([\s\S]*?)<\/div>\s*<\/section>\s*\)}/,
        replacement: '<div className="space-y-6">\n' +
                     '                            {(data?.certifications || []).map((cert, index) => (\n' +
                     '                                <div key={index} className="flex gap-6 border-b border-gray-200 pb-6 last:border-0 last:pb-0">\n' +
                     '                                    <div className="w-24 shrink-0 text-sm text-gray-500 font-serif pt-1">{cert.year}</div>\n' +
                     '                                    <div>\n' +
                     '                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{cert.title}</h4>\n' +
                     '                                        <p className="text-gray-600">{cert.issuer}</p>\n' +
                     '                                    </div>\n' +
                     '                                </div>\n' +
                     '                            ))}\n' +
                     '                        </div>\n' +
                     '                    </section>\n' +
                     '                )}'
    },
    'MidnightDeveloperTemplate.jsx': {
        regex: /<div className="grid md:grid-cols-2 gap-4">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/,
        replacement: '<div className="grid md:grid-cols-2 gap-4">\n' +
                     '                        {(data?.certifications || []).map((cert, index) => (\n' +
                     '                            <div key={index} className="p-4 border border-terminal-border bg-terminal-bg rounded flex items-center gap-4 hover:border-primary-container transition-colors">\n' +
                     '                                <span className="material-symbols-outlined text-neon-accent">verified</span>\n' +
                     '                                <div>\n' +
                     '                                    <h4 className="text-on-error font-mono font-bold text-sm">{cert.title}</h4>\n' +
                     '                                    <p className="text-on-surface-variant text-xs font-mono">{cert.issuer} // {cert.year}</p>\n' +
                     '                                </div>\n' +
                     '                            </div>\n' +
                     '                        ))}\n' +
                     '                    </div>\n' +
                     '                </div>\n' +
                     '            </section>'
    },
    'NeonCreativeTemplate.jsx': {
        regex: /<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/,
        replacement: '<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">\n' +
                     '                        {(data?.certifications || []).map((cert, index) => (\n' +
                     '                            <div key={index} className="border-4 border-on-surface p-6 bg-[#b2fba5] neobrutalist-shadow transform hover:-translate-y-1 hover:translate-x-1 transition-transform">\n' +
                     '                                <span className="material-symbols-outlined text-4xl mb-4 block">military_tech</span>\n' +
                     '                                <h4 className="font-bold text-xl mb-2">{cert.title}</h4>\n' +
                     '                                <p className="font-medium">{cert.issuer}</p>\n' +
                     '                                <div className="mt-4 inline-block px-3 py-1 bg-on-surface text-surface text-sm font-bold border-2 border-on-surface">\n' +
                     '                                    {cert.year}\n' +
                     '                                </div>\n' +
                     '                            </div>\n' +
                     '                        ))}\n' +
                     '                    </div>\n' +
                     '                </div>\n' +
                     '            </section>'
    }
};

const dir = 'frontend/src/components/templates';
for (const [filename, config] of Object.entries(templates)) {
    const filePath = path.join(dir, filename);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Test if the regex matches
    if (config.regex.test(content)) {
        content = content.replace(config.regex, config.replacement);
        fs.writeFileSync(filePath, content);
        console.log("Processed " + filename);
    } else {
        console.log("Regex failed for " + filename);
    }
}
