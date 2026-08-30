const fs = require('fs');
['midnight.html', 'neon.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const tailwindMatch = content.match(/"colors": (\{[\s\S]*?\})/);
  if (tailwindMatch) {
    let colorBlock = tailwindMatch[1];
    let colorRegex = /"([^"]+)":\s*"([^"]+)"/g;
    let keys = [];
    while ((match = colorRegex.exec(colorBlock)) !== null) {
      keys.push(match[1]);
    }
    console.log(f, 'extracted keys:', keys);
  }
});
