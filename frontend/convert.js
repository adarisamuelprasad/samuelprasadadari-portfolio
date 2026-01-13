import fs from 'fs';
import path from 'path';
import { transformSync } from 'esbuild';
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
            if (/\.(ts|tsx)$/.test(file) && !file.endsWith('.d.ts')) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);

console.log(`Found ${files.length} files to convert.`);

files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const loader = filePath.endsWith('.tsx') ? 'tsx' : 'ts';

    try {
        const result = transformSync(content, {
            loader,
            jsx: 'preserve',
            sourcemap: false,
            format: 'esm',
            target: 'esnext'
        });

        const newFilePath = filePath.replace(/\.tsx?$/, loader === 'tsx' ? '.jsx' : '.js');
        fs.writeFileSync(newFilePath, result.code);
        fs.unlinkSync(filePath);
        console.log(`Converted: ${path.basename(filePath)} -> ${path.basename(newFilePath)}`);
    } catch (err) {
        console.error(`Failed to convert ${filePath}:`, err);
    }
});

// Delete vite-env.d.ts
const dtsPath = path.join(srcDir, 'vite-env.d.ts');
if (fs.existsSync(dtsPath)) {
    fs.unlinkSync(dtsPath);
    console.log('Deleted vite-env.d.ts');
}
