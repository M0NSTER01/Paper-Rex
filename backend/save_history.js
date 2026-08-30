const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const url = 'https:\/\/' \+ res\.data\.liveUrl;\s*const updatedData = \{ \.\.\.data, liveUrl: url \};/;

const replacement = `const url = 'https://' + res.data.liveUrl;
      const newDeploy = { url, date: new Date().toISOString() };
      const updatedData = { 
        ...data, 
        liveUrl: url,
        deployments: [newDeploy, ...(data.deployments || [])]
      };`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content);
