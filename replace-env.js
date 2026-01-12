const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/assets/env.template.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace('__API_URL__', process.env.API_URL || '')

fs.writeFileSync(path.join(__dirname, 'src/assets/env.js'), content);
