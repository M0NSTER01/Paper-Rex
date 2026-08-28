import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function test() {
  // 1. Create a dummy pdf
  fs.writeFileSync('dummy.pdf', 'dummy pdf content');
  
  // 2. Register/Login
  const loginRes = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'testuser_' + Date.now(), password: 'password' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  
  console.log("Token:", token);

  // 3. Upload PDF
  const formData = new FormData();
  formData.append('resume', fs.createReadStream('dummy.pdf'));
  
  const uploadRes = await fetch('http://localhost:5000/api/portfolios/upload-resume', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  const text = await uploadRes.text();
  console.log("Upload Status:", uploadRes.status);
  console.log("Upload Response:", text);
}

test().catch(console.error);
