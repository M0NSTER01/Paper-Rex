const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

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

            // 2. We need to fetch new recommendations.

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-3.1-flash-lite",
                generationConfig: { responseMimeType: "application/json" }
            });

            const tavilyApiKey = process.env.TAVILY_API_KEY;
            const finalRecommendations = [];

            // 3. For each gap, call Tavily and then Gemini
            for (const gap of prioritizedGaps) {
                try {
                    // Tavily API Call
                    const tavilyRes = await axios.post("https://api.tavily.com/search", {
                        api_key: tavilyApiKey,
                        query: `best online course for ${gap.skill} 2026`,
                        max_results: 5,
                        include_answer: false
                    });

                    const searchResults = tavilyRes.data.results || [];

                    if (searchResults.length === 0) {
                        finalRecommendations.push({
                            skill: gap.skill,
                            importance: gap.importance,
                            courses: []
                        });
                        continue;
                    }

                    // Gemini Synthesis Call
                    const prompt = `You are a Career Expert helping a candidate address a skill gap.
Skill: ${gap.skill}
Why it's needed: ${gap.reason}

Raw Search Results:
${JSON.stringify(searchResults, null, 2)}

Select and summarize the 2-3 most relevant courses from the search results to help them learn this skill.
CRITICAL CONSTRAINTS:
1. ONLY use titles and URLs that appear VERBATIM in the provided search results.
2. NEVER invent, modify, or guess a course name or URL. 
3. If no good match exists in the results, return an empty courses array for that skill.
4. Provide a very brief (1 sentence) 'why_relevant' explanation for each selected course.

Return ONLY a valid JSON object strictly matching this schema:
{
  "skill": "${gap.skill}",
  "courses": [
    {
      "title": "string (VERBATIM from search)",
      "url": "string (VERBATIM from search)",
      "why_relevant": "string"
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

                    finalRecommendations.push({
                        skill: gap.skill,
                        importance: gap.importance,
                        courses: parsed.courses || []
                    });

                } catch (err) {
                    console.error(`Failed to fetch recommendations for skill ${gap.skill}:`, err.message);
                    // Skip and continue
                    finalRecommendations.push({
                        skill: gap.skill,
                        importance: gap.importance,
                        courses: []
                    });
                }
            }

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
