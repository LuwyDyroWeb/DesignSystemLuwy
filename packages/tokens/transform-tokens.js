
const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, 'tokens.json');
const OUTPUT_FILE = path.join(__dirname, 'tokens.clean.json');


function flattenObject(obj, prefix = '') {

  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}-${key.toLowerCase().replace(/\s+/g, '-')}` : key.toLowerCase().replace(/\s+/g, '-'); // Reemplaza espacios también
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !value.hasOwnProperty('value')) {
        Object.assign(result, flattenObject(value, newKey));
      } else {

        result[newKey] = value && value.hasOwnProperty('value') ? value : value; 
      }
    }
  }
  return result;
}


try {
  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error(`Error: El archivo de entrada no se encontro en: ${INPUT_FILE}`);
  }

  const rawTokens = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));


  
  const color = flattenObject(rawTokens['Colors/Mode 1'].Color);

  
  const font = {};
  
  if (rawTokens['Font theme/Desktop']?.Static?.Font?.Family) {
  
      font['primary'] = rawTokens['Font theme/Desktop'].Static.Font.Family; 
  } else {
      console.warn("Warning: Font family not found at expected path in tokens.json");
  }

  
 let spacing = {};
  try {
    const rawSpacing = rawTokens['Layout/Desktop']?.spacing;
    if (rawSpacing) {
      const flat = flattenObject(rawSpacing); 
      const tailwindSpacingMap = new Map(); 

      for (const [rawKey, rawValObj] of Object.entries(flat)) {
        let pixelValue;
        
        // Extrae el valor numérico en píxeles
        if (rawValObj && typeof rawValObj === 'object' && 'value' in rawValObj) {
          pixelValue = parseFloat(rawValObj.value);
        } else if (typeof rawValObj === 'number') {
          pixelValue = rawValObj;
        } else {
          continue; 
        }

        
        if (!isNaN(pixelValue) && pixelValue >= 0 && pixelValue % 4 === 0) {
          const tailwindKey = (pixelValue / 4).toString(); 
          
        
          tailwindSpacingMap.set(tailwindKey, { value: `${pixelValue}px`, type: 'dimension' });
        } else {
            console.warn(`Spacing token "${rawKey}" con valor "${rawValObj.value || rawValObj}" ignorado (no es múltiplo de 4px).`);
        }
      }
      
      
      spacing = Object.fromEntries(tailwindSpacingMap.entries());
    }
  } catch (e) {
    console.warn('Warning: No se pudieron extraer los tokens de espaciado:', e?.message || e);
  }

  
  let radius = {};
  try {
    const rawRadius = rawTokens['Shape/Mode 1']?.Corner?.radius?.radius;
    if (rawRadius) {
      const flatR = flattenObject(rawRadius);
      radius = Object.fromEntries(
        Object.entries(flatR).map(([k, v]) => {
          if (v && typeof v === 'object' && 'value' in v) {
            const val = v.value;
  
            if (typeof val === 'number') {
              return [k, { value: `${val}px`, type: 'dimension' }];
            }
            return [k, { value: `${val}`, type: 'dimension' }];
          }
          if (typeof v === 'number') {
            return [k, { value: `${v}px`, type: 'dimension' }];
          }
          return [k, v];
        })
      );
    }
  } catch (e) {
    console.warn('Warning: could not extract radius tokens:', e?.message || e);
  }

  
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify({ color, font, spacing, radius }, null, 2)
  );

  console.log(`✅ Tokens procesados (solo claves Tailwind) y guardados en ${OUTPUT_FILE}`);

} catch (error) {
  console.error('❌ Ocurrió un error al procesar los tokens:');
  console.error(error.message);
  process.exit(1);
}