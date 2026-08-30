const fs = require('fs');

let file = 'frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

// Add `saved` state
if (!content.includes('const [saved, setSaved] = useState(false);')) {
    content = content.replace('const [saving, setSaving] = useState(false);', 'const [saving, setSaving] = useState(false);\n  const [saved, setSaved] = useState(false);');
}

// Update handleSave
content = content.replace(/await axios\.put\(`https:\/\/4zxl3477-5000\.inc1\.devtunnels\.ms\/api\/portfolios\/\$\{portfolioId\}`,\s*\{\s*theme,\s*data\s*\},[\s\S]*?\);\s*\}/, 
    'await axios.put(`https://4zxl3477-5000.inc1.devtunnels.ms/api/portfolios/${portfolioId}`, \n        { theme, data },\n        { headers: { Authorization: `Bearer ${token}` } }\n      );\n      setSaved(true);\n      setTimeout(() => setSaved(false), 2000);\n    }');

// Update button
content = content.replace(/<button onClick=\{handleSave\}[\s\S]*?\{saving \? <Loader2 className="w-4 h-4 animate-spin"\/> : <Save className="w-4 h-4" \/>\} Save\s*<\/button>/,
    '<button onClick={handleSave} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-200 transition shadow-sm border border-gray-200">\n            {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : saved ? <span className="text-green-600 font-bold">✓</span> : <Save className="w-4 h-4" />} {saved ? "Saved!" : "Save"}\n          </button>');

fs.writeFileSync(file, content);
