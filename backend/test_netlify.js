const AdmZip = require('adm-zip');
const axios = require('axios');

async function testNetlify() {
    const token = 'YOUR_NETLIFY_TOKEN';
    
    // Create zip
    const zip = new AdmZip();
    zip.addFile('index.html', Buffer.from('<h1>Hello Netlify!</h1>', 'utf8'));
    const zipBuffer = zip.toBuffer();

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
