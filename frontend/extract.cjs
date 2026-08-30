const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\ragha\\.gemini\\antigravity\\brain\\b3984b1e-e6ee-4de7-9ec3-62329cb6e75d\\.system_generated\\logs\\transcript_full.jsonl';
const transcript = fs.readFileSync(transcriptPath, 'utf-8');
const lines = transcript.trim().split('\n');
let lastUserMsg = '';
for (let i = lines.length - 1; i >= 0; i--) {
  const line = JSON.parse(lines[i]);
  if (line.type === 'USER_INPUT') {
    lastUserMsg = line.content;
    break;
  }
}

const midnightMatch = lastUserMsg.match(/"midnight"\s*([\s\S]*?)(?="data Driven")/i);
const dataMatch = lastUserMsg.match(/"data Driven"\s*([\s\S]*?)(?="Mordern")/i);
const modernMatch = lastUserMsg.match(/"Mordern"\s*([\s\S]*?)(?="minimilist")/i);
const minimalistMatch = lastUserMsg.match(/"minimilist"\s*([\s\S]*?)(?:$|<\/USER_REQUEST>)/i);

console.log('midnightMatch:', !!midnightMatch);
console.log('dataMatch:', !!dataMatch);
console.log('modernMatch:', !!modernMatch);
console.log('minimalistMatch:', !!minimalistMatch);

if(midnightMatch) fs.writeFileSync('midnight.html', midnightMatch[1].trim());
if(dataMatch) fs.writeFileSync('data.html', dataMatch[1].trim());
if(modernMatch) fs.writeFileSync('modern.html', modernMatch[1].trim());
if(minimalistMatch) fs.writeFileSync('minimalist.html', minimalistMatch[1].replace(/<\/USER_REQUEST>[\s\S]*/, '').trim());

console.log('Extraction complete');
