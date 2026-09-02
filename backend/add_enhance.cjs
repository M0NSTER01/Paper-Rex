const fs = require('fs');
let c = fs.readFileSync('index.js', 'utf8');

const enhanceSummaryRoute = `
app.post('/api/enhance-summary', authenticateToken, async (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Resume data is required" });

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });
        
        const prompt = \`You are an expert career coach and resume writer. 
Based on the following candidate's full profile (experience, education, skills, projects), write a highly professional, compelling, and concise professional summary (3-4 sentences max).
Focus on their core strengths, key achievements, and the value they bring. Do not invent any facts not present in the data.
Return ONLY the raw summary text without any formatting, quotes, or JSON.

Resume Data:
\${JSON.stringify(data)}\`;
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        
        res.json({ enhancedSummary: responseText });
    } catch (err) {
        console.error("AI Enhance Error:", err);
        res.status(500).json({ error: "Failed to enhance summary" });
    }
});
`;

c = c.replace(/app\.post\('\/api\/evaluate-ats'/g, enhanceSummaryRoute + "\napp.post('/api/evaluate-ats'");
fs.writeFileSync('index.js', c);
console.log('Added /api/enhance-summary');
