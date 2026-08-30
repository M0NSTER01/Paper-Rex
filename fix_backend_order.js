const fs = require('fs');

let content = fs.readFileSync('backend/index.js', 'utf8');

// The block to extract
const routeRegex = /app\.post\('\/api\/upload-image'[\s\S]*?\}\);\n/g;
const match = content.match(routeRegex);

if (match) {
    const routeCode = match[0];
    // Remove it from its current position
    content = content.replace(routeRegex, '');
    
    // Find where to insert it: after authenticateToken is defined, maybe right before the portfolios routes
    const insertionPoint = "// Get User Portfolios";
    content = content.replace(insertionPoint, routeCode + "\n" + insertionPoint);
    
    fs.writeFileSync('backend/index.js', content);
    console.log("Fixed route order");
} else {
    console.log("Could not find route block");
}
