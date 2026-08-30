const express = require("express");
const path = require("path");
const { createServer } = require("http");
const cors = require("cors");
const mysql2 = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const server = createServer(app);

const JWT_SECRET = "YOUR_JWT_SECRET";

const fs = require('fs');
// Initialize MySQL Database Connection Pool
const pool = mysql2.createPool({
    host: "mysql-3c2f6ed-singhchhaya881-0640.k.aivencloud.com",
    port: 24331,
    user: "avnadmin",
    password: "YOUR_DB_PASSWORD",
    database: "secondlife_resume",
    ssl: {
        ca: fs.readFileSync(__dirname + '/ca.pem')
    }
}).promise();

const upload = multer({ storage: multer.memoryStorage() });

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

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        
        const [result] = await pool.query(sql, [name, email, hashedPassword]);
        
        const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: result.insertId, name, email } });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error("Signup error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/api/upload-image', authenticateToken, uploadImage.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const photoUrl = 'https://4zxl3477-5000.inc1.devtunnels.ms/uploads/' + req.file.filename;
    res.json({ photoUrl });
});

// Get User Portfolios
app.get('/api/portfolios', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM portfolios WHERE user_id = ? ORDER BY updated_at DESC', [req.user.id]);
        res.json(rows.map(row => {
            if (typeof row.data === 'string') {
                try { row.data = JSON.parse(row.data); } catch (e) {}
            }
            return row;
        }));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get Specific Portfolio (Publicly viewable)
app.get('/api/portfolios/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM portfolios WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Not found" });
        const portfolio = rows[0];
        if (typeof portfolio.data === 'string') {
            try { portfolio.data = JSON.parse(portfolio.data); } catch(e) {}
        }
        res.json(portfolio);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Create Portfolio
app.post('/api/portfolios', authenticateToken, async (req, res) => {
    const { name, theme, data } = req.body;
    if (!name) return res.status(400).json({ error: "Portfolio name is required" });

    try {
        const dataJson = data ? JSON.stringify(data) : null;
        const [result] = await pool.query(
            'INSERT INTO portfolios (user_id, name, theme, data) VALUES (?, ?, ?, ?)',
            [req.user.id, name, theme || 'Minimalist', dataJson]
        );
        res.json({ id: result.insertId, name, theme: theme || 'Minimalist', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update Portfolio
app.put('/api/portfolios/:id', authenticateToken, async (req, res) => {
    const { theme, data } = req.body;
    try {
        let updateFields = [];
        let queryParams = [];

        if (theme) {
            updateFields.push('theme = ?');
            queryParams.push(theme);
        }
        if (data) {
            updateFields.push('data = ?');
            queryParams.push(JSON.stringify(data));
        }

        if (updateFields.length === 0) return res.json({ success: true });

        queryParams.push(req.params.id, req.user.id);
        const query = "UPDATE portfolios SET " + updateFields.join(', ') + " WHERE id = ? AND user_id = ?";
        
        await pool.query(query, queryParams);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/api/extract-resume', authenticateToken, upload.single('resume'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const pdfData = await pdfParse(req.file.buffer);
        const text = pdfData.text;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
        const prompt = "Extract the following information from the resume text below and return it strictly as a JSON object matching this structure:\n{\n  \"intro\": { \"name\": \"\", \"title\": \"\", \"summary\": \"\" },\n  \"experience\": [ { \"id\": 1, \"role\": \"\", \"company\": \"\", \"years\": \"\", \"desc\": \"\" } ],\n  \"education\": [ { \"id\": 1, \"degree\": \"\", \"school\": \"\", \"years\": \"\", \"desc\": \"\" } ],\n  \"skills\": [ \"Skill 1\", \"Skill 2\" ],\n  \"projects\": [ { \"id\": 1, \"title\": \"\", \"desc\": \"\", \"tech\": [\"Tech 1\"] } ],\n  \"certifications\": [ { \"id\": 1, \"title\": \"\", \"issuer\": \"\", \"year\": \"\" } ],\n  \"contact\": { \"email\": \"\", \"linkedin\": \"\", \"github\": \"\" },\n  \"visible\": {\n    \"education\": true,\n    \"skills\": true,\n    \"experience\": true,\n    \"projects\": true,\n    \"certifications\": true\n  }\n}\n\nRules:\n- For the \"visible\" object, set the value to false ONLY IF the section is empty or missing in the resume. Otherwise, set it to true.\n- Extract as accurately as possible. If something is missing, leave it as an empty string or empty array.\n- EXTREMELY IMPORTANT: Do NOT extract personal or academic projects into the \"experience\" array. The \"experience\" array is strictly for formal employment or work experience. Projects belong ONLY in the \"projects\" array.\n- DO NOT wrap the output in markdown code blocks like ```json. Return ONLY the raw JSON string.\n\nResume Text:\n" + text;
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        
        let jsonStr = responseText;
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        const parsedData = JSON.parse(jsonStr);
        res.json(parsedData);
    } catch (err) {
        console.error("Extraction error:", err);
        res.status(500).json({ error: "Error extracting resume data" });
    }
});

// ── ATS Resume Optimization ──────────────────────────────────────────
const geminiSystemInstruction = `You are an elite Technical Recruiter, ATS (Applicant Tracking System) Optimizer, and Resume Writer. 
Your objective is to take a user's raw experience data and a target job description, and output a highly optimized, tailored resume in strict JSON format.

INPUT DATA:
The user will provide:
1. Candidate Profile: (Raw text, dictated voice transcript, or extracted PDF data)
2. Target Context: (Target Job Title, Company Name, and raw Job Description)

INSTRUCTIONS:
1. Data Extraction & Mapping: Map the user's raw data to the required JSON schema. EXTREMELY IMPORTANT: DO NOT treat personal or academic projects as work experience. Work experience must ONLY be extracted from explicit "Experience" or "Employment" sections. Projects belong in the "projects" section ONLY.
2. Job Tailoring: Rewrite the user's "Experience" and "Projects" descriptions to heavily align with the Target Context. Use the STAR method (Situation, Task, Action, Result). Quantify achievements where possible. 
3. Keyword Injection: Naturally weave in relevant keywords from the Job Description into the summary, skills, and experience sections. DO NOT lie or invent experience they do not have.
4. ATS Scoring Logic: Calculate an ATS compatibility score (integer from 0 to 100) based on a strict deterministic logic, NOT random estimation. Use this rubric:
   - Keyword Match (0-30 points): How many required skills from the job description are explicitly present?
   - Experience Match (0-40 points): Does the duration and relevance of actual work experience (excluding projects) align with the target role? If no formal experience exists, max score here is 15/40 (from relevant projects).
   - Education/Certifications (0-20 points): Does the candidate meet the educational requirements?
   - Readability & Impact (0-10 points): Formatting, action verbs, and quantifiable metrics.
   Sum these up for the final score.
5. Feedback: Identify matching keywords, missing keywords (skills they need to add if they have them), and provide 2-3 brief, actionable suggestions to improve the resume match.

OUTPUT FORMAT:
You must respond with ONLY valid JSON. No markdown formatting, no code blocks, no preamble, and no postscript.

SCHEMA TO STRICTLY FOLLOW:
{
  "optimized_profile": {
    "professional_intro": {
      "full_name": "string",
      "professional_title": "string",
      "summary": "string (3-4 impactful sentences, tailored to target role)"
    },
    "experience": [
      {
        "company": "string",
        "role": "string",
        "duration": "string",
        "description": "string (Action-oriented, STAR method, tailored bullet points)"
      }
    ],
    "education": [
      {
        "institution": "string",
        "degree": "string",
        "year": "string"
      }
    ],
    "skills": ["string", "string"],
    "projects": [
      {
        "name": "string",
        "description": "string (STAR method, tailored)",
        "technologies": ["string"]
      }
    ],
    "certifications": ["string"],
    "contact_info": {
      "email": "string",
      "linkedin_url": "string",
      "github_url": "string"
    }
  },
  "ats_analysis": {
    "score": "number (integer 0-100)",
    "matching_keywords": ["string"],
    "missing_keywords": ["string"],
    "suggestions": ["string", "string"]
  }
}`;

app.post('/api/optimize-resume', authenticateToken, async (req, res) => {
    const { candidateData, targetPosition, companyName, jobDescription } = req.body;

    if (!candidateData || !jobDescription) {
        return res.status(400).json({ error: "Candidate data and job description are required" });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-3.1-flash-lite",
            systemInstruction: geminiSystemInstruction,
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const userMessage = `
CANDIDATE PROFILE:
${typeof candidateData === 'string' ? candidateData : JSON.stringify(candidateData, null, 2)}

TARGET CONTEXT:
- Target Position: ${targetPosition || 'Not specified'}
- Company Name: ${companyName || 'Not specified'}
- Job Description:
${jobDescription}
`;

        const result = await model.generateContent(userMessage);
        const responseText = result.response.text().trim();
        
        let jsonStr = responseText;
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        const parsed = JSON.parse(jsonStr);

        const profile = parsed.optimized_profile || {};
        const intro = profile.professional_intro || {};
        const atsAnalysis = parsed.ats_analysis || {};

        // Map Gemini output → editor DEFAULT_DATA schema
        const editorData = {
            intro: {
                name: intro.full_name || '',
                title: intro.professional_title || '',
                summary: intro.summary || ''
            },
            experience: (profile.experience || []).map((exp, i) => ({
                id: i + 1,
                role: exp.role || '',
                company: exp.company || '',
                years: exp.duration || '',
                desc: exp.description || ''
            })),
            education: (profile.education || []).map((edu, i) => ({
                id: i + 1,
                degree: edu.degree || '',
                school: edu.institution || '',
                years: edu.year || ''
            })),
            skills: profile.skills || [],
            projects: (profile.projects || []).map((proj, i) => ({
                id: i + 1,
                title: proj.name || '',
                desc: proj.description || '',
                tech: proj.technologies || []
            })),
            certifications: (profile.certifications || []).map((cert, i) => {
                if (typeof cert === 'string') {
                    return { id: i + 1, title: cert, issuer: '', year: '' };
                }
                return { id: i + 1, title: cert.title || '', issuer: cert.issuer || '', year: cert.year || '' };
            }),
            contact: {
                email: profile.contact_info?.email || '',
                linkedin: profile.contact_info?.linkedin_url || '',
                github: profile.contact_info?.github_url || ''
            },
            visible: {
                education: true,
                skills: true,
                experience: true,
                projects: true,
                certifications: true
            }
        };

        res.json({
            editorData,
            atsAnalysis: {
                score: atsAnalysis.score || 0,
                matching_keywords: atsAnalysis.matching_keywords || [],
                missing_keywords: atsAnalysis.missing_keywords || [],
                suggestions: atsAnalysis.suggestions || []
            }
        });
    } catch (err) {
        console.error("ATS optimization error:", err);
        res.status(500).json({ error: "Failed to optimize resume. Please try again." });
    }
});

const setupSkillGapAnalysisRoute = require('./skillGapAnalysis');
setupSkillGapAnalysisRoute(app, authenticateToken);

const setupChatbotRoute = require('./chatbot');
setupChatbotRoute(app);

const setupCourseRecommendationsRoute = require('./courseRecommendations');
setupCourseRecommendationsRoute(app, authenticateToken, pool);

const PORT = 5000;
server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

