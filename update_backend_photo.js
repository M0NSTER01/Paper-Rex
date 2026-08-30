const fs = require('fs');
let content = fs.readFileSync('backend/index.js', 'utf8');

// Add path module
if (!content.includes('const path = require("path");')) {
    content = content.replace('const express = require("express");', 'const express = require("express");\nconst path = require("path");');
}

// Add static middleware
if (!content.includes("app.use('/uploads'")) {
    content = content.replace('app.use(express.json());', "app.use(express.json());\napp.use('/uploads', express.static(path.join(__dirname, 'uploads')));");
}

// Add image upload route
const imageUploadLogic = `
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});
const uploadImage = multer({ storage: storage });

app.post('/api/upload-image', authenticateToken, uploadImage.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const photoUrl = 'http://localhost:5000/uploads/' + req.file.filename;
    res.json({ photoUrl });
});
`;

if (!content.includes('/api/upload-image')) {
    content = content.replace('const upload = multer({ storage: multer.memoryStorage() });', 'const upload = multer({ storage: multer.memoryStorage() });\n' + imageUploadLogic);
}

fs.writeFileSync('backend/index.js', content);
console.log('Backend updated for image upload');
