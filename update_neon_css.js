const fs = require('fs');
let content = fs.readFileSync('frontend/src/index.css', 'utf8');

const themeUpdates = `
  --radius-brutal: 0px;
  --shadow-brutal: 8px 8px 0px 0px rgba(19, 27, 46, 1);
  --shadow-brutal-sm: 4px 4px 0px 0px rgba(19, 27, 46, 1);
  --shadow-brutal-hover: 2px 2px 0px 0px rgba(19, 27, 46, 1);
`;

const extraCSS = `
.theme-neon-creative {
    background-color: #faf8ff;
    color: #131b2e;
}

.theme-neon-creative .brutal-border {
    border: 4px solid #131b2e;
}
.theme-neon-creative .brutal-border-b {
    border-bottom: 4px solid #131b2e;
}
.theme-neon-creative .brutal-border-r {
    border-right: 4px solid #131b2e;
}
.theme-neon-creative .brutal-border-t {
    border-top: 4px solid #131b2e;
}
.theme-neon-creative .brutal-border-l {
    border-left: 4px solid #131b2e;
}

.theme-neon-creative .bg-amber { background-color: #FFC107; }
.theme-neon-creative .bg-teal { background-color: #00BFA5; }
.theme-neon-creative .bg-pink { background-color: #FF4081; }
.theme-neon-creative .text-amber { color: #FFC107; }
.theme-neon-creative .text-teal { color: #00BFA5; }
.theme-neon-creative .text-pink { color: #FF4081; }
.theme-neon-creative .selection\\:bg-amber *::selection { background-color: #FFC107; }

.theme-neon-creative .sticker {
    transition: all 0.2s ease-in-out;
}
.theme-neon-creative .sticker:hover {
    transform: translate(4px, 4px);
    box-shadow: 2px 2px 0px 0px rgba(19, 27, 46, 1) !important;
}
`;

if (!content.includes('--shadow-brutal')) {
    content = content.replace('}', themeUpdates + '\n}');
    content += '\n' + extraCSS;
    fs.writeFileSync('frontend/src/index.css', content);
}
