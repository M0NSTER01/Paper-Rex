const { GoogleGenerativeAI } = require("@google/generative-ai");

function setupCourseRecommendationsRoute(app, authenticateToken, pool) {
    app.post('/api/recommend-courses', authenticateToken, async (req, res) => {
        const { gaps, portfolio_id } = req.body;

        if (!gaps || !Array.isArray(gaps) || !portfolio_id) {
            return res.status(400).json({ error: "Missing required fields: gaps array and portfolio_id" });
        }

        try {
            const prioritizedGaps = [...gaps]
                .sort((a, b) => {
                    const weight = { high: 3, medium: 2, low: 1 };
                    return (weight[b.importance?.toLowerCase()] || 0) - (weight[a.importance?.toLowerCase()] || 0);
                })
                .slice(0, 5);

            if (prioritizedGaps.length === 0) {
                return res.json({ recommendations: [] });
            }

            // 1. Check cache first
            const [rows] = await pool.query(
                "SELECT recommendations_json, created_at FROM course_recommendations WHERE portfolio_id = ? ORDER BY created_at DESC LIMIT 1",
                [portfolio_id]
            );

            if (rows.length > 0) {
                const cachedAt = new Date(rows[0].created_at);
                const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                
                if (cachedAt > thirtyDaysAgo) {
                    const cachedRecs = rows[0].recommendations_json.recommendations || [];
                    const cachedSkills = cachedRecs.map(r => r.skill).sort().join('|');
                    const currentSkills = prioritizedGaps.map(g => g.skill).sort().join('|');
                    
                    if (cachedSkills === currentSkills) {
                        console.log("Returning cached course recommendations for portfolio", portfolio_id);
                        return res.json(rows[0].recommendations_json);
                    }
                }
            }

            // 2. Fetch new recommendations using purely Gemini 1.5 Flash.
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-3.5-flash-lite",
                generationConfig: { responseMimeType: "application/json" }
            });

            const prompt = `You are a Career Expert helping a candidate address their skill gaps by recommending real-world online courses.

Here are their top skill gaps:
${JSON.stringify(prioritizedGaps, null, 2)}

For each skill gap, recommend 2 high-quality, highly popular, and well-known online courses (e.g. from Coursera, Udemy, edX, Codecademy). 
Use your internal knowledge to provide the most accurate real course names and realistic URLs (e.g. https://www.coursera.org/...).
Provide a very brief (1 sentence) 'why_relevant' explanation for each selected course.

Return ONLY a valid JSON object strictly matching this schema:
{
  "recommendations": [
    {
      "skill": "skill_name",
      "importance": "high/medium/low",
      "courses": [
        {
          "title": "string",
          "url": "string",
          "why_relevant": "string"
        }
      ]
    }
  ]
}
Do not wrap the output in markdown code blocks.`;

            const result = await model.generateContent(prompt);
            let jsonStr = result.response.text().trim();

            if (jsonStr.startsWith('\`\`\`json')) {
                jsonStr = jsonStr.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
            } else if (jsonStr.startsWith('\`\`\`')) {
                jsonStr = jsonStr.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
            }

            const parsed = JSON.parse(jsonStr);

            // Ensure importance is preserved correctly
            const finalRecommendations = parsed.recommendations.map(r => {
                const originalGap = prioritizedGaps.find(g => g.skill === r.skill);
                return {
                    ...r,
                    importance: originalGap ? originalGap.importance : r.importance
                };
            });

            const responseData = { recommendations: finalRecommendations };

            // Cache the result
            try {
                await pool.query(
                    "INSERT INTO course_recommendations (portfolio_id, recommendations_json) VALUES (?, ?)",
                    [portfolio_id, JSON.stringify(responseData)]
                );
            } catch (cacheErr) {
                console.error("Failed to cache course recommendations:", cacheErr.message);
            }

            res.json(responseData);

        } catch (err) {
            console.error("Course Recommendation Error:", err);
            res.status(500).json({ error: "Failed to generate course recommendations." });
        }
    });
}

module.exports = setupCourseRecommendationsRoute;
