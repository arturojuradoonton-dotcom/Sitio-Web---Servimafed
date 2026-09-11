const fs = require('fs');
let content = fs.readFileSync('src/data/blogData.ts', 'utf8');
let counter = 1;
content = content.replace(/img:\s*"[^"]+"/g, () => `img: "/images/blog/${counter++}.jpg"`);
fs.writeFileSync('src/data/blogData.ts', content);
console.log('Updated blogData.ts');
