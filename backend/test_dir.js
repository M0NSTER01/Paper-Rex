const AdmZip = require('adm-zip');
const axios = require('axios');

async function testNetlifyDir() {
    const token = 'YOUR_NETLIFY_TOKEN';
    const zip = new AdmZip();
    zip.addFile('build/index.html', Buffer.from('<html><body><h1>Hello Netlify</h1></body></html>', 'utf8'));
    const zipBuffer = zip.toBuffer();

    try {
        const siteRes = await axios.post('https://api.netlify.com/api/v1/sites', 
            { name: 'test-dir-' + Math.floor(Math.random() * 100000) }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const siteId = siteRes.data.id;
        const deployRes = await axios.post(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, 
            zipBuffer, 
            { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/zip' } }
        );
        console.log('Deployed:', deployRes.data.deploy_url);
    } catch (err) {}
}
testNetlifyDir();
