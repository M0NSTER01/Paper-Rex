const JSZip = require('jszip');
const axios = require('axios');

async function testJSZip() {
    const token = 'YOUR_NETLIFY_TOKEN';
    
    // Create zip
    const zip = new JSZip();
    zip.file('index.html', '<h1>Hello JSZip</h1>');
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', platform: 'UNIX' });

    try {
        const siteRes = await axios.post('https://api.netlify.com/api/v1/sites', 
            { name: 'test-jszip-' + Math.floor(Math.random() * 100000) }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const siteId = siteRes.data.id;
        console.log('Site created:', siteId, siteRes.data.url);

        const deployRes = await axios.post(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, 
            zipBuffer, 
            { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/zip' } }
        );
        console.log('Deployed:', deployRes.data.deploy_url);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
}
testJSZip();
