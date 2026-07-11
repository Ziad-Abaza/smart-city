const fs = require('fs');
const content = fs.readFileSync('D:/coding/projects/smat city/web/fetch-repo.xml', 'utf-8');
const lines = content.split('\n');
let capturing = false;
let out = [];
for (const line of lines) {
  if (line.includes('<file path="version 6/js/repo.js">')) {
    capturing = true;
    continue;
  }
  if (capturing && line.includes('</file>')) {
    break;
  }
  if (capturing) {
    out.push(line);
  }
}
fs.writeFileSync('scratch-repo.js', out.join('\n'));
console.log('Done extracting repo.js, lines:', out.length);
