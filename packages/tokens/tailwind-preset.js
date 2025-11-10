const path = require('path');
const fs = require('fs');


const cleanTokensPath = path.join(__dirname, 'tokens.clean.json');
let tokens;
try {
  tokens = JSON.parse(fs.readFileSync(cleanTokensPath, 'utf8'));
} catch (error) {
  console.error(`Error reading or parsing ${cleanTokensPath}:`, error);
  
  module.exports = { content: [], theme: {}, plugins: [] };
  return; 
}



const colors = {};
if (tokens.color) { 
  for (const [key, tokenData] of Object.entries(tokens.color)) {
     const themeKey = key.replace(/^color-/, ''); 
    colors[themeKey] = `var(--${key})`; 
  }
} else {
    console.warn(`Warning: 'color' key not found in ${cleanTokensPath}. No colors will be added to Tailwind theme.`);
}



let fontFamily = {};
if (tokens.font && tokens.font['font-primary'] && tokens.font['font-primary'].value) {
    fontFamily.sans = `var(--font-primary)`; 
} else {
    console.warn(`Warning: Font data ('font.font-primary.value') not found in ${cleanTokensPath}. Default Tailwind fonts will be used.`);

}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    path.join(
      path.dirname(require.resolve('@luwy-dyro/ui/package.json')),
      'dist/**/*.{js,ts,jsx,tsx}' 
    ),
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: fontFamily,
      
    },
  },
  plugins: [],
};