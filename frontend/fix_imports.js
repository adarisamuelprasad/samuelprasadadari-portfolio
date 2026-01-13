import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath, fileList);
        } else {
            if (/\.(js|jsx)$/.test(file)) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);

console.log(`Scanning ${files.length} files for incorrect imports...`);

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace .tsx with .jsx
    content = content.replace(/from\s+['"]([^'"]+)\.tsx['"]/g, "from '$1.jsx'");
    content = content.replace(/import\s+['"]([^'"]+)\.tsx['"]/g, "import '$1.jsx'");

    // Replace .ts with .js
    content = content.replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'");
    content = content.replace(/import\s+['"]([^'"]+)\.ts['"]/g, "import '$1.js'");

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed imports in: ${path.basename(filePath)}`);
    }
});
