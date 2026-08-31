const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

// Add calculateCompletion before handleSave
const handleSaveStr = '  const handleSave = async () => {';
const calculateCompletionStr = `  const calculateCompletion = () => {
    let completed = 0;
    let total = 6;
    if (data.intro?.name && data.intro?.title && data.intro?.summary) completed++;
    if (data.experience && data.experience.length > 0) completed++;
    if (data.education && data.education.length > 0) completed++;
    if (data.skills && data.skills.length > 0) completed++;
    if (data.projects && data.projects.length > 0) completed++;
    if (data.contact?.email) completed++;
    return Math.round((completed / total) * 100);
  };

  const handleSave = async () => {`;

content = content.replace(handleSaveStr, calculateCompletionStr);

// Replace Top Bar logic
const oldTopBar = `<h1 className="font-bold font-geist text-xl text-[var(--color-primary)]">Editor</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 cursor-help" title={data.ats?.feedback || 'Click Recalculate to get ATS feedback'}>ATS Score</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className={\`h-2 rounded-full transition-all \${data.ats?.score > 70 ? 'bg-green-500' : data.ats?.score > 40 ? 'bg-yellow-500' : 'bg-red-500'}\`} style={{ width: \`\${data.ats?.score || 0}%\` }}></div>
            </div>
            <span className="text-sm font-semibold">{data.ats?.score || 0}%</span>
            <button 
               onClick={handleRecalculateATS}
               disabled={evaluatingAts}
               className="text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded hover:bg-[var(--color-secondary)] transition disabled:opacity-50 flex items-center gap-1"
            >
              {evaluatingAts ? <Loader2 className="w-3 h-3 animate-spin"/> : null}
              {evaluatingAts ? 'Evaluating...' : 'Recalculate'}
            </button>
          </div>`;

const newTopBar = `<div className="flex items-center gap-2">
            <img src="/logo.png" alt="Paper Rex Logo" className="h-8 object-contain" />
          </div>
          <div className="flex items-center gap-3 ml-2">
            <span className="text-sm text-gray-500 font-medium">Profile Completion</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: \`\${calculateCompletion()}%\` }}></div>
            </div>
            <span className="text-sm font-semibold">{calculateCompletion()}%</span>
          </div>`;

content = content.replace(oldTopBar, newTopBar);

fs.writeFileSync(file, content);
