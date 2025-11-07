# CSF Design System — Monorepo

Monorepo con pnpm/turbo para construir y publicar:
- `@luwy-dyro/tokens`: Design tokens (CSS variables, fuentes, JS) generados con Style Dictionary.
- `@luwy-dyro/ui`: Librería de componentes React que consume los tokens.
- `apps/docs`: Portal de documentación (Vite + Tailwind v4).

Este repo publica en GitHub Packages y usa Changesets para versionado y release.

## Requisitos
- Node 18+ (recomendado Node 20)
- pnpm 10.x
- Token clásico (PAT) con scopes `write:packages`, `read:packages` y `repo` (si el repo es privado)

## Publicar paquetes (manual)
1) Crear un changeset (elige paquetes y tipo de versión):
```powershell
pnpm changeset
```
2) Aplicar versionado y actualizar changelogs:
```powershell
pnpm changeset version
pnpm install
```
3) Build del monorepo:
```powershell
pnpm build
```
4) Autenticación local (elige una):
- A) Iniciar sesión una vez por máquina:
  ```powershell
  pnpm login --registry=https://npm.pkg.github.com --scope=@luwy-dyro
  ```
- B) Usar variable de entorno (útil en CI):
  - `.npmrc` (ya está en la raíz):
    ```
    @luwy-dyro:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=${NPM_TOKEN}
    ```
  - En PowerShell:
    ```powershell
    $env:NPM_TOKEN = 'ghp_...'
    ```
5) Publicar:
```powershell
pnpm changeset publish
```
6) Subir cambios:
```powershell
git add .
git commit -m "release: publish"
git push origin main
```

## Publicar con GitHub Actions
El workflow `.github/workflows/release.yml`:
- Se ejecuta en push a `main` o manualmente (workflow_dispatch)
- Instala, construye y ejecuta `pnpm changeset publish`
- Usa `GITHUB_TOKEN` como `NPM_TOKEN` para que los paquetes se conecten automáticamente a este repositorio (aparecen en el tab "Packages")

Flujo: crear changeset → `pnpm changeset version` → `git push` → Actions publica.

## Consumir los paquetes desde apps externas
GitHub Packages para npm requiere autenticación.

1) Autenticación (elige una):
- A) Iniciar sesión una vez:
  ```powershell
  pnpm login --registry=https://npm.pkg.github.com --scope=@luwy-dyro
  ```
- B) `.npmrc` del proyecto consumidor:
  ```
  @luwy-dyro:registry=https://npm.pkg.github.com/
  //npm.pkg.github.com/:_authToken=${NPM_TOKEN}
  ```
  y en PowerShell: `$env:NPM_TOKEN = 'ghp_...'`

2) Instalar:
```powershell
pnpm add @luwy-dyro/tokens @luwy-dyro/ui
```
(Si aparece el aviso de `Ignored build scripts`, ejecuta `pnpm approve-builds` y aprueba `esbuild` y otros de confianza.)

3) CSS global (orden recomendado):
```css
@import "@luwy-dyro/tokens/css/preset.css"; /* tokens */
@import "tailwindcss";                      /* opcional */
@import "@luwy-dyro/ui/styles";             /* estilos del UI */
```

4) Usar en React (Vite):
```tsx
import { Button } from '@luwy-dyro/ui'

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('ok')}>Hola</Button>
  )
}
```
Con este orden, Tailwind v4 (si está presente) generará utilidades con los tokens, y los componentes del UI tendrán estilos propios sin depender del escaneo de clases.

## Estructura y salidas de build
- `@luwy-dyro/tokens`
  - CSS: `dist/css/variables.css`, `dist/css/fonts.css`
  - JS/Types: `dist/js/index.js`, `dist/js/index.d.ts`
  - Fuentes: `dist/fonts/*`
- `@luwy-dyro/ui`
  - Módulos: `dist/csf-ui.es.js` (ESM), `dist/csf-ui.umd.js` (UMD)
  - Tipos: `dist/index.d.ts`

## Troubleshooting
- 401/404: asegura autenticación y scopes del token; conecta el paquete al repo o deja que lo haga el workflow.
- EPERM en Windows: cierra dev servers, evita mezclar gestores (solo pnpm), y si migraste elimina locks (`package-lock.json`, `yarn.lock`).
- `pnpm approve-builds`: aprueba scripts de build confiables.

## Visibilidad
Puedes cambiar la visibilidad del paquete en su página de GitHub Packages → Settings → Change visibility.
