const { GoogleGenerativeAI } = require("@google/generative-ai");

function setupSkillGapAnalysisRoute(app, authenticateToken) {
    app.post('/api/analyze-skill-gaps', authenticateToken, async (req, res) => {
        const { data, jobDescription } = req.body;

        if (!data) {
            return res.status(400).json({ error: "Resume data is required" });
        }

        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-3.5-flash-lite",
                generationConfig: {
                    responseMimeType: "application/json"
                }
            });

            const prompt = `You are an expert Career Coach and Technical Recruiter.
Analyze the following resume data to identify skill gaps and strengths.
${jobDescription ? `Compare it against this target job description:\n${jobDescription}` : 'Since no job description is provided, infer the target role based on their experience and skills, and compare against general market-standard expectations for that role.'}

RESUME DATA:
${JSON.stringify({
    skills: data.skills,
    experience: data.experience,
    projects: data.projects,
    education: data.education
}, null, 2)}

Return ONLY a valid JSON object strictly matching this schema:
{
  "inferred_role": "string (or null if job description provided)",
  "gaps": [
    {
      "skill": "string",
      "importance": "high" | "medium" | "low",
      "reason": "string (why this skill is needed)",
      "how_to_address": "string (brief action to learn/showcase it)"
    }
  ],
  "strengths": ["string"]
}

Do not wrap the output in markdown code blocks.`;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text().trim();

            let jsonStr = responseText;
            if (jsonStr.startsWith('```json')) {
                jsonStr = jsonStr.replace(/^```json\n/, '').replace(/\n```$/, '');
            } else if (jsonStr.startsWith('```')) {
                jsonStr = jsonStr.replace(/^```\n/, '').replace(/\n```$/, '');
            }

            let parsed;
            try {
                parsed = JSON.parse(jsonStr);
            } catch (parseErr) {
                console.error("Failed to parse JSON. Raw response was:", jsonStr);
                throw parseErr;
            }
            res.json(parsed);

        } catch (err) {
            console.error("Skill Gap Analysis error:", err.message);
            res.status(500).json({ error: "Failed to analyze skill gaps. Please try again." });
        }
    });
}

module.exports = setupSkillGapAnalysisRoute;
