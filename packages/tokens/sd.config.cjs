
const StyleDictionary = require('style-dictionary');


StyleDictionary.registerFormat({
  name: 'css/theme',
  formatter: function({ dictionary, options }) {
    let output = '/* stylelint-disable at-rule-no-unknown */\n@theme {\n';

    
    if (dictionary.properties.font && dictionary.properties.font.primary) {
        output += `  --font-sans: var(--font-primary);\n`;
    }

    
    if (dictionary.properties.color) {
      dictionary.allProperties.forEach(prop => {
        if (prop.attributes.category === 'color') {
          
          const themeKey = prop.path.slice(1).join('-');
          const value = prop.value; // usa el valor literal (ej. #0043a5)
          output += `  --color-${themeKey}: ${value};\n`;
        }
      });
    }

  if (dictionary.properties.spacing) {
      dictionary.allProperties.forEach(prop => {
        if (prop.attributes.category === 'spacing') {
         
          const key = prop.path.slice(-1)[0]; 
          const value = prop.value; 
          
          
          output += `  --spacing-${key}: ${value};\n`; 
        }
      });
    }

    
    if (dictionary.properties.radius) {
      const seen = new Set();
      dictionary.allProperties.forEach(prop => {
        if (prop.attributes.category === 'radius') {
          let themeKey = prop.path.slice(1).join('-')
            .replace(/[\s,]+/g, '-')
            .replace(/--+/g, '-');
          if (seen.has(themeKey)) return;
          seen.add(themeKey);
          const value = typeof prop.value === 'number' ? `${prop.value}px` : prop.value;
          output += `  --radius-${themeKey}: ${value};\n`;
        }
      });
    }

    output += '}\n/* stylelint-enable at-rule-no-unknown */';
    return output;
  }
});


module.exports = {
  source: ['tokens.clean.json'], 
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: { selector: ':root' }
        },
      
        {
          destination: 'theme.css',
          format: 'css/theme' 
        }
      ]
    },
    js: { 
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{ format: 'javascript/es6', destination: 'index.js' }]
    }
    
  }
};