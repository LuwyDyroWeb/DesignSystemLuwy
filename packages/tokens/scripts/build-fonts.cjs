// Copy fonts.css and fonts folder to dist in a cross-platform way
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcFontsDir = path.join(root, 'fonts'); // user-provided directory
const distDir = path.join(root, 'dist');
const distCssDir = path.join(distDir, 'css');
const distFontsDir = path.join(distDir, 'fonts');
const staticCssFiles = ['fonts.css'];

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return false;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else copyFile(s, d);
  }
  return true;
}

ensureDir(distDir);
ensureDir(distCssDir);

// Copy CSS files declared en src
for (const cssFile of staticCssFiles) {
  const srcCssPath = path.join(root, 'src', cssFile);
  if (!fs.existsSync(srcCssPath)) {
    console.warn(`${cssFile} no encontrado en ${srcCssPath}`);
    continue;
  }
  copyFile(srcCssPath, path.join(distCssDir, cssFile));
}

// Copy fonts directory
if (!copyDir(srcFontsDir, distFontsDir)) {
  console.warn(`Carpeta de fuentes no encontrada: ${srcFontsDir}`);
}

console.log('✅ Assets estáticos copiados a dist/');

// Crear un preset.css que agregue los CSS en el orden correcto para Tailwind v4
// Esto facilita el consumo en apps externas: solo importan este archivo.
const presetCssPath = path.join(distCssDir, 'preset.css');
const presetCss = [
  // 1) @theme primero (literal values)
  fs.existsSync(path.join(distCssDir, 'theme.css'))
    ? "@import './theme.css';"
    : '/* theme.css no encontrado: omitiendo bloque @theme */',
  // 2) variables y 3) fonts después
  "@import './variables.css';",
  "@import './fonts.css';",
].join('\n');

try {
  fs.writeFileSync(presetCssPath, presetCss, 'utf8');
  console.log('✅ Generado dist/css/preset.css');
} catch (err) {
  console.warn('⚠️  No se pudo crear preset.css:', err?.message || err);
}
