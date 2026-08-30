const fs = require('fs');
const colors = {
    "surface-dim": "#d2d9f4",
    "surface-tint": "#544fc0",
    "on-primary": "#ffffff",
    "on-primary-fixed-variant": "#3b35a7",
    "secondary": "#006591",
    "tertiary-fixed-dim": "#ffb694",
    "on-tertiary-fixed": "#351000",
    "tertiary-fixed": "#ffdbcc",
    "surface-container-high": "#e2e7ff",
    "on-secondary-container": "#004666",
    "background": "#faf8ff",
    "on-primary-container": "#a9a7ff",
    "primary-fixed-dim": "#c3c0ff",
    "on-secondary-fixed-variant": "#004c6e",
    "surface-container-low": "#f2f3ff",
    "secondary-container": "#39b8fd",
    "error": "#ba1a1a",
    "primary-fixed": "#e2dfff",
    "primary": "#1f108e",
    "on-tertiary-fixed-variant": "#7a3003",
    "outline-variant": "#c8c4d5",
    "surface-container-lowest": "#ffffff",
    "on-surface": "#131b2e",
    "on-secondary": "#ffffff",
    "on-surface-variant": "#464553",
    "surface": "#faf8ff",
    "surface-variant": "#dae2fd",
    "surface-bright": "#faf8ff",
    "tertiary-container": "#752c00",
    "on-secondary-fixed": "#001e2f",
    "inverse-primary": "#c3c0ff",
    "on-background": "#131b2e",
    "on-error-container": "#93000a",
    "on-tertiary-container": "#fe9562",
    "on-error": "#ffffff",
    "outline": "#777584",
    "tertiary": "#511c00",
    "inverse-surface": "#283044",
    "surface-container": "#eaedff",
    "primary-container": "#3730a3",
    "error-container": "#ffdad6",
    "on-primary-fixed": "#0f0069",
    "surface-container-highest": "#dae2fd",
    "inverse-on-surface": "#eef0ff",
    "secondary-fixed-dim": "#89ceff",
    "on-tertiary": "#ffffff",
    "secondary-fixed": "#c9e6ff",
    "electric-violet": "#8b5cf6",
    "amber": "#FFC107",
    "teal": "#00BFA5",
    "pink": "#FF4081",
    "secondary-fixed": "#000000",
    "tertiary-fixed": "#000000"
};

let content = fs.readFileSync('frontend/src/index.css', 'utf8');

let themeBlock = "@theme {\n";
for (const [key, val] of Object.entries(colors)) {
    themeBlock += "  --color-" + key + ": var(--color-" + key + ", " + val + ");\n";
}
themeBlock += `  
  --font-geist: "Geist", monospace;
  --font-inter: "Inter", sans-serif;
  --font-sans: "Inter", sans-serif;
  --font-serif: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  --font-headline-md: "Playfair Display", serif;
  --font-headline-md-mobile: "Playfair Display", serif;
  --font-label-md: "Inter", sans-serif;
}`;

content = content.replace(/@theme \{[\s\S]*?\}/, themeBlock);
fs.writeFileSync('frontend/src/index.css', content);
