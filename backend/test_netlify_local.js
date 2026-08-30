const AdmZip = require('adm-zip');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function testNetlify() {
    const token = 'YOUR_NETLIFY_TOKEN';
    
    // Create zip
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'netlify-deploy-'));
    fs.writeFileSync(path.join(tempDir, 'index.html'), '<h1>Hello Netlify! Testing HTML content</h1>', 'utf8');
    
    const zip = new AdmZip();
    zip.addLocalFolder(tempDir);
    const zipBuffer = zip.toBuffer();
    fs.rmSync(tempDir, { recursive: true, force: true });

    try {
        // Create site
        const siteRes = await axios.post('https://api.netlify.com/api/v1/sites', 
            { name: 'test-portfolio-' + Math.floor(Math.random() * 100000) }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const siteId = siteRes.data.id;
        const liveUrl = siteRes.data.url;
        console.log('Site created:', siteId, liveUrl);

        // Deploy zip
        const deployRes = await axios.post(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, 
            zipBuffer, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/zip'
                } 
            }
        );
        console.log('Deployed:', deployRes.data.deploy_url);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
}

testNetlify();
