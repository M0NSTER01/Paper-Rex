const fs = require('fs');

let file = 'backend/index.js';
let content = fs.readFileSync(file, 'utf8');

const replacement = `const AdmZip = require('adm-zip');

app.post('/api/deploy', authenticateToken, async (req, res) => {
    const { htmlContent, slug } = req.body;
    if (!htmlContent || !slug) return res.status(400).json({ error: "Missing htmlContent or slug" });

    try {
        const token = process.env.NETLIFY_TOKEN;
        
        // 1. Create a zip containing the index.html
        const zip = new AdmZip();
        zip.addFile('index.html', Buffer.from(htmlContent, 'utf8'));
        const zipBuffer = zip.toBuffer();

        // 2. Create a new site on Netlify
        const siteName = 'portfolio-' + slug + '-' + Math.floor(Math.random() * 100000);
        const siteRes = await axios.post('https://api.netlify.com/api/v1/sites', 
            { name: siteName },
            { headers: { Authorization: \`Bearer \${token}\` } }
        );
        const siteId = siteRes.data.id;
        const liveUrl = siteRes.data.url;

        // 3. Deploy the zip to the site
        await axios.post(\`https://api.netlify.com/api/v1/sites/\${siteId}/deploys\`, 
            zipBuffer, 
            { 
                headers: { 
                    Authorization: \`Bearer \${token}\`,
                    'Content-Type': 'application/zip'
                } 
            }
        );

        res.json({ liveUrl: liveUrl.replace('https://', '') });
    } catch (err) {
        console.error("Deploy error:", err.response ? err.response.data : err.message);
        res.status(500).json({ error: "Failed to deploy to Netlify" });
    }
});

const PORT = 5000;`;

content = content.replace('const PORT = 5000;', replacement);
fs.writeFileSync(file, content);
