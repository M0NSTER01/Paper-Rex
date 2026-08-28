import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import PDFDocument from 'pdfkit';

async function createPDF() {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('real.pdf'));
    doc.fontSize(25).text('John Doe\nSoftware Engineer\nSkills: JavaScript, React, Node.js', 100, 100);
    doc.end();
    setTimeout(resolve, 1000); // wait for file to write
  });
}

async function test() {
  await createPDF();
  
  // Register/Login
  const loginRes = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'testuser_' + Date.now(), password: 'password' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  
  // Upload PDF
  const formData = new FormData();
  formData.append('resume', fs.createReadStream('real.pdf'));
  
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
