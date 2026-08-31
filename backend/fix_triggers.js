const fs = require('fs');
let f = '../frontend/src/pages/Editor.jsx';
let c = fs.readFileSync(f, 'utf8');

const startMarker = "// --- CHATBOT WIDGET ---";
const endMarker = "// ------------------------";

const startIndex = c.indexOf(startMarker);
const endIndex = c.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    let before = c.substring(0, startIndex);
    let middle = c.substring(startIndex, endIndex + endMarker.length);
    let after = c.substring(endIndex + endMarker.length);

    // We want to add the code for handling .ai-chat-trigger
    
    // Find where the event listeners are added
    const fabListener = "chatFab.addEventListener('click', () => {\\n        chatWindow.classList.remove('hidden');\\n        chatFab.classList.add('hidden');\\n      });";
    const newFabListener = `chatFab.addEventListener('click', () => {
        chatWindow.classList.remove('hidden');
        chatFab.classList.add('hidden');
      });

      // Handle template-specific AI buttons
      const templateAIBtns = document.querySelectorAll('.ai-chat-trigger');
      if (templateAIBtns.length > 0) {
        chatFab.style.display = 'none'; // Hide fallback FAB if template has its own
        templateAIBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            chatWindow.classList.remove('hidden');
          });
        });
      }`;
      
    // Also, when the chat closes, we only show the fallback FAB if no template AI buttons exist
    const closeListener = "chatClose.addEventListener('click', () => {\\n        chatWindow.classList.add('hidden');\\n        chatFab.classList.remove('hidden');\\n      });";
    const newCloseListener = `chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        if (templateAIBtns.length === 0) {
          chatFab.classList.remove('hidden');
        }
      });`;

    middle = middle.replace(fabListener, newFabListener);
    middle = middle.replace(closeListener, newCloseListener);

    c = before + middle + after;
    fs.writeFileSync(f, c);
    console.log("Updated Editor.jsx to support .ai-chat-trigger");
} else {
    console.log("Markers not found");
}
