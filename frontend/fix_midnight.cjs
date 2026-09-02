const fs = require('fs');
let c = fs.readFileSync('src/components/templates/MidnightDeveloperTemplate.jsx', 'utf8');

const targetRegex = /<span className="text-rose-400">const<\/span> tech_stack = \{'\{'\}<br\/>[\s\S]*?\{'\};'\}/;

const replacement = `{(() => {
                                      const skills = data?.skills || ['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS'];
                                      const chunkSize = Math.ceil(skills.length / 4) || 1;
                                      const core = skills.slice(0, chunkSize);
                                      const frontend = skills.slice(chunkSize, chunkSize * 2);
                                      const backend = skills.slice(chunkSize * 2, chunkSize * 3);
                                      const tools = skills.slice(chunkSize * 3);
                                      
                                      const renderArray = (arr) => arr.map((item, i) => (
                                          <React.Fragment key={i}>
                                              <span className="text-green-400">'{item}'</span>
                                              {i < arr.length - 1 ? ', ' : ''}
                                          </React.Fragment>
                                      ));

                                      return (
                                          <>
                                              <span className="text-rose-400">const</span> tech_stack = {'{'}<br/>
                                              {core.length > 0 && <>&nbsp;&nbsp;<span className="text-blue-400">core</span>: [{renderArray(core)}],<br/></>}
                                              {frontend.length > 0 && <>&nbsp;&nbsp;<span className="text-blue-400">frontend</span>: [{renderArray(frontend)}],<br/></>}
                                              {backend.length > 0 && <>&nbsp;&nbsp;<span className="text-blue-400">backend</span>: [{renderArray(backend)}],<br/></>}
                                              {tools.length > 0 && <>&nbsp;&nbsp;<span className="text-blue-400">tools</span>: [{renderArray(tools)}]<br/></>}
                                              {'};'}
                                          </>
                                      );
                                  })()}`;

if (targetRegex.test(c)) {
  c = c.replace(targetRegex, replacement);
  fs.writeFileSync('src/components/templates/MidnightDeveloperTemplate.jsx', c);
  console.log('Fixed skills in MidnightDeveloperTemplate');
} else {
  console.log('Could not find target section in MidnightDeveloperTemplate');
}
