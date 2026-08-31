const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
async function test() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      generationConfig: { responseMimeType: 'application/json' }
    });
    const prompt = `You are an expert Career Coach and Technical Recruiter.
Analyze the following resume data to identify skill gaps and strengths.
Since no job description is provided, infer the target role based on their experience and skills, and compare against general market-standard expectations for that role.

RESUME DATA:
{
  "skills": [],
  "experience": [],
  "projects": [],
  "education": []
}

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
    let responseText = result.response.text().trim();
    if (responseText.startsWith('```json')) {
        responseText = responseText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (responseText.startsWith('```')) {
        responseText = responseText.replace(/^```\n/, '').replace(/\n```$/, '');
    }
    console.log(responseText);
    JSON.parse(responseText);
    console.log('success');
  } catch(e) {
    console.error('Error:', e.message);
  }
}
test();
