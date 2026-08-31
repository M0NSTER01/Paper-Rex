const fs = require('fs');
let f = '../frontend/src/pages/Editor.jsx';
let c = fs.readFileSync(f, 'utf8');

// The issue is that the injected HTML has backticks that close the outer htmlContent template literal early.
// We need to escape all backticks that are part of the injected vanilla script.
// Let's replace the whole block starting from "// --- CHATBOT WIDGET ---" to "// ------------------------"

const startMarker = "// --- CHATBOT WIDGET ---";
const endMarker = "// ------------------------";

const startIndex = c.indexOf(startMarker);
const endIndex = c.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    let before = c.substring(0, startIndex);
    let middle = c.substring(startIndex, endIndex + endMarker.length);
    let after = c.substring(endIndex + endMarker.length);

    // Escape backticks and ${} inside the middle section so they don't break the outer template literal
    // We want the literal characters `\`` and `\${` in the JSX file.
    
    // First, let's just replace all backticks with escaped backticks
    middle = middle.replace(/`/g, "\\`");
    // Also escape ${ that aren't data or import.meta.env
    middle = middle.replace(/\$\{msg\}/g, "\\${msg}");
    middle = middle.replace(/\$\{loadingId\}/g, "\\${loadingId}");
    middle = middle.replace(/\$\{resData\.response\.replace\(\/<\/g, "&lt;"\)\}/g, "\\${resData.response.replace(/</g, \"&lt;\")}");

    c = before + middle + after;
    fs.writeFileSync(f, c);
    console.log("Fixed Editor.jsx");
} else {
    console.log("Markers not found");
}
