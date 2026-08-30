const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
require('dotenv').config();

async function run() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: 'gemini-3.1-flash-lite',
        generationConfig: { responseMimeType: 'application/json' }
    });
    const tavilyApiKey = process.env.TAVILY_API_KEY;
    const gap = { skill: 'Years of Experience (5+ years required)', reason: 'Need more experience' };

    try {
        console.log("Calling Tavily...");
        const tavilyRes = await axios.post('https://api.tavily.com/search', {
            api_key: tavilyApiKey,
            query: 'best online course for ' + gap.skill + ' 2026',
            max_results: 5,
            include_answer: false
        });
        const searchResults = tavilyRes.data.results || [];
        console.log('Tavily results count:', searchResults.length);

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

        console.log("Calling Gemini...");
        const result = await model.generateContent(prompt);
        let jsonStr = result.response.text().trim();
        console.log('Gemini returned:', jsonStr);
    } catch(e) {
        console.error('Error:', e.message);
    }
}
run();
