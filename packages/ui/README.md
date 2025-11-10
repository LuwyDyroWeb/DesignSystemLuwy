## @luwy-dyro/ui – Consumo

Este paquete expone componentes React que asumen:

1. La aplicación consumidora usa TailwindCSS v4.
2. Los design tokens de `@luwy-dyro/tokens` (variables CSS) se importan ANTES del CSS que declara `@theme` (en `docs` se hace en `main.tsx`).
3. El consumidor incluye el código fuente de `@luwy-dyro/ui` en el escaneo `content` de Tailwind o añade las clases necesarias a una `safelist`.

### Pasos mínimos en un consumidor

```ts
// main.tsx
import '@luwy-dyro/tokens/dist/css/variables.css';
import './index.css'; // contiene @import "tailwindcss" y el bloque @theme que mapea tokens -> escala Tailwind
```

En `index.css` (del consumidor) se mapean tokens:

```css
@theme {
  --color-blue-500: var(--color-primary-blue-500);
  /* etc */
}
```

### ¿Por qué no importamos Tailwind dentro de la librería?

Para evitar duplicar el motor y permitir que el consumidor controle purga, theming y tree-shaking. La librería sólo debería incluir estilos propios (si los hubiera), no regenerar todas las utilidades.

### Añadir nuevas escalas de color

1. Agrega token en `@luwy-dyro/tokens` y ejecuta `pnpm --filter @luwy-dyro/tokens build`.
2. Mapea la variable en el bloque `@theme` del consumidor o genera automáticamente un CSS de mapeo.

### Generación automática futura

Se puede crear un script que lea `tokens.clean.json` y produzca un archivo `scales.css` con los alias `--color-<alias>-<step>` para todas las familias.

### Ejemplo de clase funcionando

```jsx
<Button variant="primary" /> // aplica bg-blue-500 -> usa var(--color-blue-500) -> apunta a --color-primary-blue-500
```

### Troubleshooting

| Problema | Causa típica | Solución |
|----------|--------------|----------|
| Clase `bg-blue-500` sin estilos | Tailwind no escaneó la librería | Añadir ruta fuente al `content` del consumidor |
| Variable CSS unresolved | Orden de imports incorrecto | Importa `@luwy-dyro/tokens` antes del CSS con `@theme` |
| Hover no aplica | Variante no generada/purgada | Añadir a safelist o usarla en el source del UI |

MIT License
````markdown
---

# Guía rápida (actualizada)

Para consumir @luwy-dyro/ui con el nuevo flujo:

1) Instala los paquetes
```powershell
pnpm add @luwy-dyro/ui @luwy-dyro/tokens
```

2) Importa en tu CSS global (orden):
```css
@import "@luwy-dyro/tokens/css/preset.css"; /* tokens */
@import "tailwindcss";                      /* opcional */
@import "@luwy-dyro/ui/styles";             /* estilos del UI */
```

3) Usa el Button
```tsx
import { Button } from '@luwy-dyro/ui';

export default function Demo() {
  return (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="primary-green" size="large">Green</Button>
      <Button bgToken="alert-error" bgLevel={500} hoverLevel={600}>Error</Button>
    </>
  );
}
```

Clases CSS disponibles: `btn`, `btn--sm|md|lg`, `btn--weight-*`, `btn--primary-*`, `btn--secondary`, `btn--error|info|warning|success`, `btn--neutro-*`, `btn--custom` (+ `btn--custom-darktext`). Las clases antiguas `csf-btn*` siguen siendo válidas como alias.

````