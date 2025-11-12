# @luwydyroweb/tokens

Design tokens del Design System.

## Instalación
```powershell
pnpm add @luwydyroweb/tokens
```
Requiere autenticación contra GitHub Packages (ver README de la raíz para opciones con `pnpm login` o `${NPM_TOKEN}`).

## Uso
Importa los CSS en el entry de tu app (orden recomendado):
```css
/* 1) Tokens primero: variables, fuentes y @theme */
@import "@luwydyroweb/tokens/css/preset.css";

/* 2) Tailwind (opcional, si usas utilidades) */
@import "tailwindcss";
```
Luego puedes usar las variables CSS directamente o utilidades de Tailwind como `bg-primary-blue-600`.

### Tipografía
Este paquete incluye fuentes (Poppins) y variables:
- `--font-primary`
- `--font-mono`
- `--font-size-base`
- `--font-weight-regular|medium|semibold|bold`

### Tailwind v4
`preset.css` importa `variables.css` + `fonts.css` + `theme.css` en el orden correcto. Recomendaciones:

- Instala Tailwind v4 si deseas utilidades.
- Importa el preset de tokens ANTES de `@import "tailwindcss";`.

Ejemplo de `src/index.css`:

```css
@import "@luwydyroweb/tokens/css/preset.css";
@import "tailwindcss"; /* opcional */
```

Con esto, Tailwind reconocerá el `@theme {}` del preset y generará utilidades como `bg-primary-blue-600` sin pasos extra.

### Escalas disponibles: colors, spacing y radius
- Colors: `bg-<token>-<level>` por ejemplo `bg-primary-blue-600`, `text-alert-error-500`, `border-neutro-black-300`.
- Spacing: claves normalizadas tipo Tailwind v4 (con `-` en lugar de `.`):
	- 0, 0-25, 0-5, 0-75, 1, 1-25, 1-5, 2, 2-5, 3, 4, 5, 6, 7, 8
	- Ejemplos: `p-0-75`, `px-1`, `py-1-5`, `gap-2-5`, `m-0`.
- Radius: `rounded-<nombre>` por ejemplo `rounded-small`, `rounded-medium`, `rounded-large`, `rounded-extra-large`, `rounded-full`.

Estas utilidades se generan a partir del bloque `@theme` que expone variables como `--spacing-1-5: 24px;` y `--radius-medium: 12px;`.

## Salidas
- CSS: `dist/css/variables.css`, `dist/css/fonts.css`, `dist/css/theme.css`, `dist/css/preset.css`
- JS: `dist/js/index.js` (tokens en objeto)
- Tipos: `dist/js/index.d.ts`
- Fuentes: `dist/fonts/*`

## Notas
- Generado con Style Dictionary a partir de `tokens.json` → `tokens.clean.json`.
- Si agregas nuevas fuentes, colócalas en `packages/tokens/fonts/` y se copiarán a `dist/fonts/` en el build.
