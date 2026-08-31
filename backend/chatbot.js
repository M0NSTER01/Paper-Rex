const { GoogleGenerativeAI } = require("@google/generative-ai");

function setupChatbotRoute(app) {
    app.post('/api/chat', async (req, res) => {
        const { message, history, context } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            let systemPrompt = "You are a helpful AI assistant for Paper Rex (formerly SecondLife Resume), a platform that helps users create web portfolios. Keep your answers concise, helpful, and friendly. Provide career advice and resume tips.";
            
            if (context) {
                systemPrompt += `\n\nYou are currently chatting with a user about their specific resume/portfolio. Here is their context data:\n${JSON.stringify(context, null, 2)}\n\nUse this context to give highly personalized answers. If they ask about their skills, experience, or what they should learn, reference this data.`;
            }

            const model = genAI.getGenerativeModel({ 
                model: "gemini-3.5-flash-lite",
                systemInstruction: systemPrompt
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
            console.error("Chatbot error:", err.stack || err);
            require('fs').appendFileSync('chatbot-error.log', new Date().toISOString() + " " + (err.stack || err) + "\n");
            res.status(500).json({ error: "Failed to generate response." });
        }
    });
}

module.exports = setupChatbotRoute;
