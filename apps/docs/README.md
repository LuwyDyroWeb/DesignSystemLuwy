````markdown
# apps/docs

Portal de documentación (Vite + React + Tailwind v4) para validar e ilustrar el consumo de `@luwydyroweb/tokens` y `@luwydyroweb/ui`.

## Scripts

 Dev: inicia el servidor de desarrollo
```powershell
pnpm --filter docs dev
```
 Build: compila a producción
```powershell
pnpm --filter docs build
```
 Preview: sirve la build localmente
```powershell
pnpm --filter docs preview
```

## Integración de tokens y UI

`src/index.css` importa en este orden:
```css
@import "@luwydyroweb/tokens/css/preset.css"; /* tokens */
@import "tailwindcss";                      /* utilidades (opcional) */
@import "@luwydyroweb/ui/styles";             /* estilos del UI */
```

Ejemplos en `src/Ejemplo.tsx` muestran:
- Variantes de Button
- Tamaños y pesos tipográficos
- Uso de `bgToken/bgLevel/hoverLevel`

## Problemas comunes
- No se ven estilos del Button: falta `@import "@luwydyroweb/ui/styles";`.
- Utilidades Tailwind no aparecen: verifica que el preset de tokens se importe antes que Tailwind.
````
      },
