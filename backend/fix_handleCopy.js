const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove handleCopy from useEffect
const badInjectRegex = /\s*const handleCopy = \(\) => \{\s*navigator\.clipboard\.writeText\(data\.liveUrl\);\s*setCopied\(true\);\s*setTimeout\(\(\) => setCopied\(false\), 2000\);\s*\};\s*/;
content = content.replace(badInjectRegex, '\n    ');

// 2. Put handleCopy just above the main return block
const handleCopyFunc = `
  const handleCopy = () => {
    navigator.clipboard.writeText(data.liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
`;

content = content.replace(/(return \(\s*<div className="h-screen flex flex-col bg-\[var\(--color-surface\)\])/, handleCopyFunc + '\n  $1');

fs.writeFileSync(file, content);
