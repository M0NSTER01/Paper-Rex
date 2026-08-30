const fs = require('fs');
const path = require('path');

const files = [
    { file: 'minimalist.html', name: 'MinimalistTemplate', theme: 'minimalist' },
    { file: 'modern.html', name: 'ModernTemplate', theme: 'modern' },
    { file: 'data.html', name: 'DataDrivenTemplate', theme: 'data-driven' },
    { file: 'clean.html', name: 'CleanAcademicTemplate', theme: 'clean-academic' },
    { file: 'midnight.html', name: 'MidnightDeveloperTemplate', theme: 'midnight' },
    { file: 'neon.html', name: 'NeonCreativeTemplate', theme: 'neon' },
];

let globalCss = '';

files.forEach(({ file, name, theme }) => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Extract colors
    const tailwindMatch = content.match(/"colors": (\{[\s\S]*?\})/);
    let colorKeys = [];
    if (tailwindMatch) {
        try {
            let colorBlock = tailwindMatch[1];
            let colorRegex = /"([^"]+)":\s*"([^"]+)"/g;
            let match;
            globalCss += `.theme-${theme} {\n`;
            while ((match = colorRegex.exec(colorBlock)) !== null) {
                globalCss += `  --color-${match[1]}: ${match[2]};\n`;
                colorKeys.push(match[1]);
            }
            globalCss += `}\n\n`;
        } catch (e) {
            console.error(`Error parsing colors for ${file}`, e);
        }
    }
    
    // Extract inline <style> block from <head>
    const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
    if (styleMatch) {
        let inlineCss = styleMatch[1];
        // Replace body { with .theme-theme {
        inlineCss = inlineCss.replace(/body\s*\{/g, `.theme-${theme} {`);
        // Prefix other classes with .theme-theme to scope them
        // This is a rough but effective way for these specific templates
        inlineCss = inlineCss.replace(/(\.[a-zA-Z0-9_-]+)(?=\s*\{|\s*,|\s*:)/g, `.theme-${theme} $1`);
        globalCss += `\n/* Inline styles from ${file} */\n${inlineCss}\n`;
    }

    // 2. Extract Body content to preserve Stitch's full mockups
    let bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
        let bodyContent = bodyMatch[1];
        
        // Remove script tags at the end
        bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/g, '');
        
        // Convert classes matching custom colors to var(...)
        colorKeys.forEach(color => {
            // e.g. text-primary -> text-[var(--color-primary)]
            // bg-surface-dim -> bg-[var(--color-surface-dim)]
            // Use word boundaries or regex matching the prefix
            const classPrefixes = ['bg', 'text', 'border', 'ring', 'fill', 'stroke', 'shadow', 'from', 'via', 'to'];
            classPrefixes.forEach(prefix => {
                const regex = new RegExp(`\\\\b${prefix}-${color}\\\\b`, 'g');
                bodyContent = bodyContent.replace(regex, `${prefix}-[var(--color-${color})]`);
            });
            // Handle hover/focus variants (simple case: hover:text-primary)
            classPrefixes.forEach(prefix => {
                const regex = new RegExp(`hover:${prefix}-${color}\\\\b`, 'g');
                bodyContent = bodyContent.replace(regex, `hover:${prefix}-[var(--color-${color})]`);
            });
        });

        // Convert class to className
        bodyContent = bodyContent.replace(/class=/g, 'className=');
        
        // Close tags
        bodyContent = bodyContent.replace(/<img([^>]*)>/g, '<img$1 />');
        bodyContent = bodyContent.replace(/<input([^>]*)>/g, '<input$1 />');
        bodyContent = bodyContent.replace(/<hr([^>]*)>/g, '<hr$1 />');
        bodyContent = bodyContent.replace(/<br([^>]*)>/g, '<br$1 />');
        
        // Strip inline styles (before escaping braces so we don't worry about them)
        bodyContent = bodyContent.replace(/style="[^"]*"/g, '');

        // Escape curly braces safely
        bodyContent = bodyContent.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');

        // Comments
        bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
        
        // SVG camelCasing
        bodyContent = bodyContent.replace(/fill-rule=/g, 'fillRule=');
        bodyContent = bodyContent.replace(/clip-rule=/g, 'clipRule=');
        bodyContent = bodyContent.replace(/stroke-width=/g, 'strokeWidth=');
        bodyContent = bodyContent.replace(/stroke-linecap=/g, 'strokeLinecap=');
        bodyContent = bodyContent.replace(/stroke-linejoin=/g, 'strokeLinejoin=');

        // We know they use "Alex Mercer"
        bodyContent = bodyContent.replace(/>\s*Alex Mercer\s*</g, '>{data.intro.name}<');
        bodyContent = bodyContent.replace(/>\s*Senior Full-Stack Engineer\s*</g, '>{data.intro.title}<');
        bodyContent = bodyContent.replace(/>\s*Building scalable web applications and intuitive user experiences\. Passionate about bridging the gap between complex engineering challenges and elegant design solutions\.\s*</gi, '>{data.intro.summary}<');

        // We wrap it in a div with the theme class
        // Crucial: style={{ transform: 'translateZ(0)' }} forces a new containing block for `position: fixed` elements!
        const componentCode = `
import React from 'react';

export default function ${name}({ data }) {
    return (
        <div className="theme-${theme} bg-surface-bright text-on-surface w-full h-full overflow-x-hidden overflow-y-auto antialiased relative" style={{ transform: 'translateZ(0)' }}>
            ${bodyContent}
        </div>
    );
}
`;
        fs.writeFileSync(`src/components/templates/${name}.jsx`, componentCode);
        console.log(`Generated ${name}.jsx`);
    }
});

fs.appendFileSync('src/index.css', '\n/* Generated Theme Colors */\n' + globalCss);
console.log('Appended theme colors to index.css');
