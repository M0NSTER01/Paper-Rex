const archiver = require('archiver');
const axios = require('axios');

async function testArchiver() {
    const token = 'YOUR_NETLIFY_TOKEN';
    
    // Create zip
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.append('<h1>Hello Archiver</h1>', { name: 'index.html' });
    archive.finalize();
    
    // Convert archiver stream to buffer
    const chunks = [];
    for await (const chunk of archive) {
        chunks.push(chunk);
    }
    const zipBuffer = Buffer.concat(chunks);

    try {
        const siteRes = await axios.post('https://api.netlify.com/api/v1/sites', 
            { name: 'test-archiver-' + Math.floor(Math.random() * 100000) }, 
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
testArchiver();
