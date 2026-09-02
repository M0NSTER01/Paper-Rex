const fs = require('fs');
let c = fs.readFileSync('src/components/templates/MinimalistTemplate.jsx', 'utf8');

const oldLogic = `const groups = [
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
                            }`;

const newLogic = `let groups = [];
                            
                            if (data?.categorizedSkills && data.categorizedSkills.length > 0) {
                                const icons = ['star', 'devices', 'dns', 'build', 'cloud'];
                                groups = data.categorizedSkills.map((cat, idx) => ({
                                    title: cat.category,
                                    icon: icons[idx % icons.length],
                                    skills: cat.items || []
                                }));
                            } else {
                                groups = [
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
                            }`;

c = c.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/templates/MinimalistTemplate.jsx', c);
console.log("Updated MinimalistTemplate");
