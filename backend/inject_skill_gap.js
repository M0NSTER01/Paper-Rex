const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
if (!content.includes('SkillGapAnalysis')) {
    content = content.replace(/(import NeonCreativeTemplate from '\.\.\/components\/templates\/NeonCreativeTemplate';)/, "$1\nimport SkillGapAnalysis from '../components/SkillGapAnalysis';");
}

// 2. Add component below Contact section
const target = `            </section>
  
          </div>
        </div>
  
        {/* Right Panel - Live Preview */}`;
const replacement = `            </section>
            
            {/* Skill Gap Analysis */}
            <SkillGapAnalysis data={data} />
            
          </div>
        </div>
  
        {/* Right Panel - Live Preview */}`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
