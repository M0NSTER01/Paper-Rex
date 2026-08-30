const fs = require('fs');

let file = 'frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexSave = /const handleSave = async \(\) => \{\s*if \(\!portfolioId\) return;\s*setSaving\(true\);/;
const replacementSave = `const handleSave = async () => {
    if (!data.intro?.name?.trim() || !data.contact?.email?.trim() || !data.intro?.title?.trim()) {
      alert("Mandatory Fields Missing:\\nPlease ensure your Full Name, Professional Title, and Contact Email are filled in before saving.");
      return false;
    }
    if (!portfolioId) return false;
    setSaving(true);`;

content = content.replace(regexSave, replacementSave);

const regexPublish = /const handlePublish = \(\) => \{\s*handleSave\(\)\.then\(\(\) => \{\s*navigate\(`\/portfolio\/\$\{portfolioId \|\| 'demo'\}`\);\s*\}\);\s*\};/;
const replacementPublish = `const handlePublish = () => {
    handleSave().then((success) => {
      if (success !== false) {
        navigate(\`/portfolio/\${portfolioId || 'demo'}\`);
      }
    });
  };`;

content = content.replace(regexPublish, replacementPublish);

// Add visual asterisk to labels
content = content.replace('<label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>', '<label className="block text-xs font-semibold text-gray-500 mb-1">Full Name <span className="text-red-500">*</span></label>');
content = content.replace('<label className="block text-xs font-semibold text-gray-500 mb-1">Professional Title</label>', '<label className="block text-xs font-semibold text-gray-500 mb-1">Professional Title <span className="text-red-500">*</span></label>');
content = content.replace('<label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>', '<label className="block text-xs font-semibold text-gray-500 mb-1">Email <span className="text-red-500">*</span></label>');


fs.writeFileSync(file, content);
