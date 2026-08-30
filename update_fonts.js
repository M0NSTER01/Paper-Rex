const fs = require('fs');
let content = fs.readFileSync('frontend/src/index.css', 'utf8');

const typography = `
  --text-display: 48px;
  --text-display--line-height: 56px;
  --text-display--letter-spacing: -0.02em;
  --text-display--font-weight: 700;
  
  --text-label-md: 14px;
  --text-label-md--line-height: 20px;
  --text-label-md--letter-spacing: 0.02em;
  --text-label-md--font-weight: 600;
  
  --text-headline-lg: 32px;
  --text-headline-lg--line-height: 40px;
  --text-headline-lg--letter-spacing: -0.01em;
  --text-headline-lg--font-weight: 600;
  
  --text-mono: 13px;
  --text-mono--line-height: 18px;
  
  --text-body-md: 16px;
  --text-body-md--line-height: 24px;
  
  --text-headline-md: 24px;
  --text-headline-md--line-height: 32px;
  --text-headline-md--font-weight: 500;
  
  --text-body-lg: 18px;
  --text-body-lg--line-height: 28px;
  
  --text-headline-lg-mobile: 24px;
  --text-headline-lg-mobile--line-height: 32px;
  --text-headline-lg-mobile--font-weight: 600;

  --font-display: "Geist", sans-serif;
  --font-label-md: "Geist", sans-serif;
  --font-headline-lg: "Geist", sans-serif;
  --font-mono: "Geist", monospace;
  --font-body-md: "Inter", sans-serif;
  --font-headline-md: "Geist", sans-serif;
  --font-body-lg: "Inter", sans-serif;
  --font-headline-lg-mobile: "Geist", sans-serif;
`;

if (!content.includes('--text-display')) {
    content = content.replace('}', typography + '\n}');
    fs.writeFileSync('frontend/src/index.css', content);
}
