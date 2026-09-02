const fs = require('fs');
let c = fs.readFileSync('src/pages/Editor.jsx', 'utf8');

const target = `const formData = new FormData();
                            formData.append('photo', file);
                            try {
                              const token = localStorage.getItem('token');
                              const res = await axios.post(\`\${import.meta.env.VITE_BACKEND_URL}/api/upload-image\`, formData, {
                                headers: { 'Authorization': \`Bearer \${token}\`, 'Content-Type': 'multipart/form-data' }
                              });
                              const arr = [...data.projects];
                              arr[idx].image = res.data.photoUrl;
                              setData({...data, projects: arr});
                            } catch (err) {
                              alert('Failed to upload project photo');
                            }`;

const replacement = `const reader = new FileReader();
                            reader.onloadend = () => {
                              const arr = [...data.projects];
                              arr[idx].image = reader.result;
                              setData({...data, projects: arr});
                            };
                            reader.readAsDataURL(file);`;

if(c.includes(target)) {
  c = c.replace(target, replacement);
  fs.writeFileSync('src/pages/Editor.jsx', c);
  console.log('Fixed project photo upload');
} else {
  console.log('Target not found, trying regex...');
  const targetRegex = /const formData = new FormData\(\);[\s\S]*?alert\('Failed to upload project photo'\);\s*\}/;
  if(targetRegex.test(c)) {
    c = c.replace(targetRegex, replacement);
    fs.writeFileSync('src/pages/Editor.jsx', c);
    console.log('Fixed project photo upload via regex');
  } else {
    console.log('Could not find project photo upload logic');
  }
}
