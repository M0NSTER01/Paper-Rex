import express from 'express';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse-new');
import { v4 as uuidv4 } from 'uuid';
import { getPool } from '../db.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI SDK (uses GEMINI_API_KEY from env)
const ai = new GoogleGenAI();

// 1. Upload Resume & parse via AI
router.post('/upload-resume', authenticate, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    // Parse PDF text
    const data = await pdfParse(req.file.buffer);
    const text = data.text;
    
    // Prompt Gemini to extract and enhance the content
    const prompt = `You are an expert resume parser and career coach. 
I am going to provide you with raw text extracted from a resume.
Please extract the information and return it as a JSON object matching this exact structure:
{
  "basics": {
    "name": "string",
    "label": "string",
    "email": "string",
    "phone": "string",
    "summary": "string - Rewrite their summary to be highly professional, engaging, and powerful.",
    "profiles": [{"network": "string", "url": "string"}]
  },
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "position": "string",
      "startDate": "string",
      "endDate": "string",
      "highlights": ["string - Rewrite bullet points to be strong, quantifiable achievements if possible"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "url": "string"
    }
  ],
  "education": [
    {
      "institution": "string",
      "area": "string",
      "studyType": "string",
      "startDate": "string",
      "endDate": "string"
    }
  ]
}

Return ONLY valid JSON. Do not include markdown code blocks or any other text.
Here is the raw resume text:
${text}`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
    });

    let textResp = response.text;
    if (textResp.startsWith('```json')) {
      textResp = textResp.replace(/^```json\n?/, '').replace(/```\n?$/, '');
    } else if (textResp.startsWith('```')) {
      textResp = textResp.replace(/^```\n?/, '').replace(/```\n?$/, '');
    }
    const extractedData = JSON.parse(textResp.trim());

    res.json({ extractedData, rawTextLength: text.length });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: 'AI Error: ' + err.message });
  }
});

// 2. Save/Update Portfolio (Creates a new version)
router.post('/', authenticate, async (req, res) => {
  const { id, template, content, commitMessage = 'Updated portfolio' } = req.body;
  const pool = getPool();
  const userId = req.user.id;

  try {
    let portfolioId = id;
    let newVersionNumber = 1;

    // Check if portfolio exists and belongs to user
    if (portfolioId) {
      const [portfolios] = await pool.query('SELECT * FROM portfolios WHERE id = ? AND user_id = ?', [portfolioId, userId]);
      if (portfolios.length === 0) return res.status(403).json({ error: 'Unauthorized or not found' });
      
      const [versions] = await pool.query('SELECT MAX(version_number) as max_v FROM portfolio_versions WHERE portfolio_id = ?', [portfolioId]);
      newVersionNumber = (versions[0].max_v || 0) + 1;
    } else {
      portfolioId = uuidv4();
      await pool.query('INSERT INTO portfolios (id, user_id, template, is_published) VALUES (?, ?, ?, ?)', [portfolioId, userId, template || 'developer', true]);
    }

    // Insert new version
    const [result] = await pool.query('INSERT INTO portfolio_versions (portfolio_id, version_number, content) VALUES (?, ?, ?)', [portfolioId, newVersionNumber, JSON.stringify(content)]);
    const versionId = result.insertId;

    // Update portfolios current version and template
    await pool.query('UPDATE portfolios SET current_version_id = ?, template = ? WHERE id = ?', [versionId, template || 'developer', portfolioId]);

    res.json({ id: portfolioId, message: 'Portfolio saved successfully', versionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Get User's Portfolios
router.get('/my', authenticate, async (req, res) => {
  const pool = getPool();
  try {
    const [portfolios] = await pool.query('SELECT * FROM portfolios WHERE user_id = ?', [req.user.id]);
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. Get Public Portfolio by ID
router.get('/:id', async (req, res) => {
  const pool = getPool();
  try {
    const [portfolios] = await pool.query('SELECT * FROM portfolios WHERE id = ?', [req.params.id]);
    if (portfolios.length === 0) return res.status(404).json({ error: 'Portfolio not found' });

    const portfolio = portfolios[0];
    const [versions] = await pool.query('SELECT * FROM portfolio_versions WHERE id = ?', [portfolio.current_version_id]);
    
    if (versions.length === 0) return res.status(404).json({ error: 'Portfolio content not found' });

    res.json({
      ...portfolio,
      content: versions[0].content
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 5. Get History
router.get('/:id/history', authenticate, async (req, res) => {
  const pool = getPool();
  try {
    const [versions] = await pool.query('SELECT id, version_number, created_at FROM portfolio_versions WHERE portfolio_id = ? ORDER BY version_number DESC', [req.params.id]);
    res.json(versions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 6. Rollback to version
router.post('/:id/rollback', authenticate, async (req, res) => {
  const { versionId } = req.body;
  const pool = getPool();
  try {
    // Check ownership
    const [portfolios] = await pool.query('SELECT * FROM portfolios WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (portfolios.length === 0) return res.status(403).json({ error: 'Unauthorized' });

    await pool.query('UPDATE portfolios SET current_version_id = ? WHERE id = ?', [versionId, req.params.id]);
    res.json({ message: 'Rollback successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 7. Hit analytics
router.post('/:id/hit', async (req, res) => {
  const pool = getPool();
  try {
    await pool.query('INSERT INTO analytics (portfolio_id) VALUES (?)', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 8. Chatbot Edit (Real AI)
router.post('/chatbot-edit', authenticate, async (req, res) => {
  const { prompt, currentContent } = req.body;
  
  try {
    const aiPrompt = `You are a helpful AI assistant modifying a JSON portfolio object.
The user wants to make a change based on this prompt: "${prompt}"

Here is the current JSON state of their portfolio:
${JSON.stringify(currentContent)}

Apply the user's requested changes to the JSON and return the FULL updated JSON object. 
Make sure you return exactly the same schema, just with the requested updates applied.
Return ONLY valid JSON. Do not include markdown code blocks.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: aiPrompt,
        config: {
          responseMimeType: "application/json",
        }
    });

    let textResp = response.text;
    if (textResp.startsWith('```json')) {
      textResp = textResp.replace(/^```json\n?/, '').replace(/```\n?$/, '');
    } else if (textResp.startsWith('```')) {
      textResp = textResp.replace(/^```\n?/, '').replace(/```\n?$/, '');
    }
    const updatedContent = JSON.parse(textResp.trim());
    
    res.json({ updatedContent, message: "AI has applied your requested changes!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process AI chat request' });
  }
});

export default router;
