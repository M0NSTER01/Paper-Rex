const fs = require('fs');

let file = 'frontend/src/main.jsx';
let content = fs.readFileSync(file, 'utf8');

const importStr = "import { GoogleOAuthProvider } from '@react-oauth/google';\n";
content = importStr + content;

const replacement = `<GoogleOAuthProvider clientId="566985246617-bl7okmpdoerl0llbr9vdub5adknqqr4n.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>`;

content = content.replace(/<BrowserRouter>[\s\S]*?<\/BrowserRouter>/, replacement);

fs.writeFileSync(file, content);
