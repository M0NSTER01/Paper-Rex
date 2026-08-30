const fs = require('fs');
let content = fs.readFileSync('frontend/src/index.css', 'utf8');

const additionalCss = `
.theme-modern .bento-card {
    background: var(--color-surface);
    border: 1px solid var(--color-outline-variant);
    border-radius: 0.75rem;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.theme-modern .bento-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -10px rgba(31, 16, 142, 0.15);
}

.theme-modern .lens-active {
    background-color: var(--color-secondary);
    color: var(--color-on-secondary);
    box-shadow: 0 4px 6px -1px rgba(0, 101, 145, 0.2);
}

.theme-modern .hero-split {
    min-height: calc(100vh - 4rem);
}
`;

if (!content.includes('.theme-modern .bento-card')) {
    content += '\n' + additionalCss;
    fs.writeFileSync('frontend/src/index.css', content);
}
