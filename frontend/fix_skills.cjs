const fs = require('fs');
let c = fs.readFileSync('src/components/templates/MinimalistTemplate.jsx', 'utf8');

const targetRegex = /<div className="grid md:grid-cols-3 gap-8">[\s\S]*?<\/section>/;

const replacement = `{(() => {
                            const groups = [
                                { title: 'Core Skills', icon: 'star', skills: [] },
                                { title: 'Technologies', icon: 'devices', skills: [] },
                                { title: 'Tools & Platforms', icon: 'build', skills: [] }
                            ];
                            
                            if (data?.skills?.length) {
                                data.skills.forEach((skill, idx) => {
                                    groups[idx % 3].skills.push(skill);
                                });
                            } else {
                                groups[0].skills = ['React', 'JavaScript', 'HTML/CSS'];
                                groups[1].skills = ['Node.js', 'Python', 'SQL'];
                                groups[2].skills = ['Git', 'Docker', 'AWS'];
                            }

                            return (
                                <div className="grid md:grid-cols-3 gap-8">
                                    {groups.map((group, idx) => group.skills.length > 0 && (
                                        <div key={idx} className="bg-surface p-6 rounded-2xl border border-surface-variant">
                                            <h4 className="font-serif font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">{group.icon}</span> 
                                                {group.title}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {group.skills.map((s, sIdx) => (
                                                    <span key={sIdx} className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })()}
                      </div>
                  </section>`;

if (targetRegex.test(c)) {
  c = c.replace(targetRegex, replacement);
  fs.writeFileSync('src/components/templates/MinimalistTemplate.jsx', c);
  console.log('Fixed skills in MinimalistTemplate');
} else {
  console.log('Could not find target section');
}
