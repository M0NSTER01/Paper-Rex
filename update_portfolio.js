const fs = require('fs');

let content = fs.readFileSync('frontend/src/pages/Portfolio.jsx', 'utf8');

// Replace MOCK_DATA passing with state data passing
content = content.replace(/const MOCK_DATA = \{[\s\S]*?};\n/s, '');
content = content.replace(/const \[theme, setTheme\] = useState\('Minimalist'\);/, "const [theme, setTheme] = useState('Minimalist');\n  const [data, setData] = useState({});");

content = content.replace(/if \(res\.data\.theme\) \{\n\s*setTheme\(res\.data\.theme\);\n\s*\}/s, `if (res.data.theme) setTheme(res.data.theme);
      if (res.data.data) setData(res.data.data);`);

content = content.replace(/<([a-zA-Z]+Template) data=\{MOCK_DATA\} \/>/g, '<$1 data={data} />');

fs.writeFileSync('frontend/src/pages/Portfolio.jsx', content);
console.log('Updated Portfolio.jsx logic');
