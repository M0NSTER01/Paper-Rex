const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `        if (contactForm) {`;

const vanillaChatbotStr = `
        // --- CHATBOT WIDGET ---
        const chatWidget = document.createElement('div');
        chatWidget.innerHTML = \`
          <button id="chat-fab" class="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-blue-700 transition">
            <span class="material-symbols-outlined">chat</span>
          </button>
          <div id="chat-window" class="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 hidden" style="height: 500px; max-height: 85vh;">
            <div class="bg-blue-600 p-4 flex items-center justify-between text-white shrink-0 rounded-t-2xl">
              <span class="font-bold">Ask AI</span>
              <button id="chat-close" class="text-white hover:text-gray-200">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
              <div class="self-start bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">
                Hi! Ask me anything about this portfolio!
              </div>
            </div>
            <form id="chat-form" class="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0 rounded-b-2xl">
              <input type="text" id="chat-input" placeholder="Ask a question..." class="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none" required />
              <button type="submit" class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        \`;
        document.body.appendChild(chatWidget);

        const chatFab = document.getElementById('chat-fab');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');

        chatFab.addEventListener('click', () => {
          chatWindow.classList.remove('hidden');
          chatFab.classList.add('hidden');
        });
        chatClose.addEventListener('click', () => {
          chatWindow.classList.add('hidden');
          chatFab.classList.remove('hidden');
        });

        let chatHistory = [{ role: 'model', parts: [{ text: 'Hi! Ask me anything about this portfolio!' }] }];
        const contextData = \${JSON.stringify(data)};
        const backendUrl = "\${import.meta.env.VITE_BACKEND_URL}";

        chatForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const msg = chatInput.value.trim();
          if(!msg) return;

          // Add user message to UI
          chatMessages.innerHTML += \`<div class="self-end bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%]">\${msg}</div>\`;
          chatInput.value = '';
          chatMessages.scrollTop = chatMessages.scrollHeight;

          const loadingId = 'loading-' + Date.now();
          chatMessages.innerHTML += \`<div id="\${loadingId}" class="self-start bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] animate-pulse">Thinking...</div>\`;
          chatMessages.scrollTop = chatMessages.scrollHeight;

          try {
            const res = await fetch(backendUrl + '/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: msg, history: chatHistory, context: contextData })
            });
            const data = await res.json();
            
            document.getElementById(loadingId).remove();
            
            if(data.response) {
              chatMessages.innerHTML += \`<div class="self-start bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">\${data.response}</div>\`;
              chatHistory.push({ role: 'user', parts: [{ text: msg }] });
              chatHistory.push({ role: 'model', parts: [{ text: data.response }] });
            } else {
              chatMessages.innerHTML += \`<div class="self-start bg-red-100 text-red-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">Error fetching response</div>\`;
            }
          } catch(err) {
            document.getElementById(loadingId).remove();
            chatMessages.innerHTML += \`<div class="self-start bg-red-100 text-red-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">Connection error</div>\`;
          }
          chatMessages.scrollTop = chatMessages.scrollHeight;
        });
        // ------------------------

        if (contactForm) {`;

content = content.replace(targetStr, vanillaChatbotStr);

fs.writeFileSync(file, content);
console.log('Injected vanilla chatbot into htmlContent!');
