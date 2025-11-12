# @luwydyroweb/tokens

## 0.12.0

### Minor Changes

- feat: tokens and UI Components

## 0.11.0

### Minor Changes

- feat(tokens): normalize spacing keys and add spacing/radius to @theme for Tailwind v4 utilities (p-_, m-_, gap-_, rounded-_)

  - Spacing keys normalized to Tailwind-friendly names: 0, 0-25, 0-5, 0-75, 1, 1-25, 1-5, 2, 2-5, 3, 4, 5, 6, 7, 8.
  - Remove duplicate and comma-based keys from variables.css.
  - Expose spacing/radius in theme.css so consumers get utilities without manual var().

- f024fdc: feat(tokens): update dist from new Figma tokens.json (adds new color families/levels and regenerates preset/theme/variables)

## 0.10.0

### Minor Changes

- feat(ui, token, docs) firts version

### Patch Changes

- docs: update READMEs to document preset-first flow and UI styles import order
  feat(ui): switch default emitted classes to short `btn*`

## 0.9.0

### Minor Changes

- feat (tokens): Tokens add CSS estáticos y preset

## 0.8.0

### Minor Changes

- feat (tokens): to tailwindcss

## 0.7.0

### Minor Changes

- feat(token) ad theme tailwindCSS

## 0.6.0

### Minor Changes

- feat(tokens) theme.css config package.json

## 0.5.0

### Minor Changes

- feat(tokens) theme tailwind

## 0.4.0

### Minor Changes

- feat(tokens): tokens clean and preset

## 0.3.0

### Minor Changes

- feat(tokens): Convert package to a Tailwind CSS preset for easier setup

## 0.2.0

### Minor Changes

- 4a8c3e9: feat(tokens): Configure package to work as a TailwindCSS preset for easier consumption

## 0.1.2

### Patch Changes

- Add the prebuilt `theme-aliases.css` file so Tailwind v4 consumers get all token-based utilities without maintaining a manual @theme block.

## 0.1.1

### Patch Changes

- Fix: add CSS subpath exports in package.json so consumers can import
  `@luwydyroweb/tokens/dist/css/variables.css` and `fonts.css` without resolver errors.

## 0.1.0

### Minor Changes

- 5eb9002: Initial release of tokens and UI packages published to GitHub Packages.

### Patch Changes

- Add monospace family and base font size variables to fonts.css:

  - `--font-mono`
  - `--font-size-base`

  This improves ergonomics for consumers using typography tokens.
