const fs = require('fs');
let c = fs.readFileSync('src/components/templates/MidnightDeveloperTemplate.jsx', 'utf8');

const startStr = "const skills = data?.skills";
const endStr = "})()}";

const startIdx = c.indexOf(startStr);
const endIdx = c.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `let cats = [];
                                        if (data?.categorizedSkills && data.categorizedSkills.length > 0) {
                                            cats = data.categorizedSkills;
                                        } else {
                                            const skills = data?.skills || ['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS'];
                                            const chunkSize = Math.ceil(skills.length / 4) || 1;
                                            cats = [
                                                { category: 'core', items: skills.slice(0, chunkSize) },
                                                { category: 'frontend', items: skills.slice(chunkSize, chunkSize * 2) },
                                                { category: 'backend', items: skills.slice(chunkSize * 2, chunkSize * 3) },
                                                { category: 'tools', items: skills.slice(chunkSize * 3) }
                                            ].filter(c => c.items.length > 0);
                                        }
                                        
                                        const renderArray = (arr) => arr.map((item, i) => (
                                            <React.Fragment key={i}>
                                                <span className="text-green-400">'{item}'</span>
                                                {i < arr.length - 1 ? ', ' : ''}
                                            </React.Fragment>
                                        ));
  
                                        return (
                                            <>
                                                <span className="text-rose-400">const</span> tech_stack = {'{'}<br/>
                                                {cats.map((cat, idx) => (
                                                    <React.Fragment key={idx}>
                                                        &nbsp;&nbsp;<span className="text-blue-400">{cat.category.toLowerCase().replace(/[^a-z0-9]/g, '_')}</span>: [{renderArray(cat.items)}]{idx < cats.length - 1 ? ',' : ''}<br/>
                                                    </React.Fragment>
                                                ))}
                                                {'};'}
                                            </>
                                        );
                                    })()}`;
  
  c = c.substring(0, startIdx) + replacement + c.substring(endIdx + 5);
  fs.writeFileSync('src/components/templates/MidnightDeveloperTemplate.jsx', c);
  console.log("Updated MidnightDeveloperTemplate via indices");
} else {
  console.log("Could not find start or end index");
}
