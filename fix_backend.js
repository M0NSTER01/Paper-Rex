const fs = require('fs');

let content = fs.readFileSync('backend/index.js', 'utf8');

// Fix syntax errors: 
content = content.replace(/\\\`UPDATE portfolios SET \\\$\\{updateFields\\.join\\(', '\\)\\} WHERE id = \\? AND user_id = \\?\\\`/g, "\`UPDATE portfolios SET \${updateFields.join(', ')} WHERE id = ? AND user_id = ?\`");

content = content.replace(/\\\`\\\`\\\`json\\\\n/g, "\`\`\`json\\n");
content = content.replace(/\\\\n\\\`\\\`\\\`/g, "\\n\`\`\`");
content = content.replace(/\\\`\\\`\\\`/g, "\`\`\`");

content = content.replace(/\\\`\\nExtract the following/g, "\`\nExtract the following");
content = content.replace(/Resume Text:\\n\\\$\\{text\\}\\n\\\`/g, "Resume Text:\\n\${text}\\n\`");

fs.writeFileSync('backend/index.js', content);
