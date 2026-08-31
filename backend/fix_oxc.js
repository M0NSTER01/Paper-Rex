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

    // Remove the escaped backticks that crash Oxc and replace with array join
    // First, find the block inside chatWidget.innerHTML
    middle = middle.replace(/chatWidget\.innerHTML = \\`([\s\S]*?)\\`;/, (match, html) => {
        // Split html by newlines
        const lines = html.split('\n');
        // Wrap each line in single quotes and join with +
        const jsLines = lines.map(line => "'" + line.replace(/'/g, "\\'") + "\\n'").join(' +\n');
        return 'chatWidget.innerHTML = \n' + jsLines + ';';
    });
    
    // Also fix the other innerHTML assignments that use \`
    middle = middle.replace(/chatMessages\.innerHTML \+= \\`([\s\S]*?)\\`;/g, (match, html) => {
        const lines = html.split('\n');
        const jsLines = lines.map(line => "'" + line.replace(/'/g, "\\'") + "\\n'").join(' +\n');
        return 'chatMessages.innerHTML += \n' + jsLines + ';';
    });

    c = before + middle + after;
    fs.writeFileSync(f, c);
    console.log("Fixed Editor.jsx to avoid Oxc parsing bug");
} else {
    console.log("Markers not found");
}
