const { GoogleGenerativeAI } = require("@google/generative-ai");

function setupChatbotRoute(app) {
    app.post('/api/chat', async (req, res) => {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-3.1-flash-lite",
                systemInstruction: "You are a helpful AI assistant for SecondLife Resume, a platform that helps users extract resumes from PDFs, optimize them for ATS, analyze skill gaps, and create stunning web portfolios. Keep your answers concise, helpful, and friendly. Provide career advice, resume tips, and guide users on how to use the platform."
            });

            let cleanHistory = history || [];
            while (cleanHistory.length > 0 && cleanHistory[0].role === 'model') {
                cleanHistory.shift();
            }

            const chat = model.startChat({
                history: cleanHistory
            });

            const result = await chat.sendMessage(message);
            const responseText = result.response.text();

            res.json({ response: responseText });
        } catch (err) {
            console.error("Chatbot error:", err);
            res.status(500).json({ error: "Failed to generate response." });
        }
    });
}

module.exports = setupChatbotRoute;
