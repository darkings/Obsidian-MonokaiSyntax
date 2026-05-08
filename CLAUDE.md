# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Commands

```
npm run dev            # Watch mode (rebuilds theme.css on SCSS changes)
npm run build          # Production build → dist/theme.css
npm run lint:css       # Stylelint on src/scss/**/*.scss
npm run check:contrast # WCAG contrast ratio audit
npm run audit:css      # CSS quality audit
npm run verify:icons   # Validate icon font coverage
npm run verify:graph   # Validate graph view CSS variables
npm run generate:icons # Regenerate file-icons.generated.scss from icon font
npm run release:pack   # Full pre-release check (verify + lint + build + audit)
npm run build:vault    # Build and sync to Obsidian vault
```

The `generate:icons` script runs automatically before `build` and `lint:css` via `prebuild`/`prelint:css` hooks.

## Architecture

This is an **Obsidian theme** that maps the VS Code Monokai Pro color palette onto Obsidian's ~400 CSS custom properties. The build toolchain is **Vite** with a custom `obsidianThemeBundle` plugin that concatenates `license.css` + compiled SCSS + Style Settings YAML configs into a single `dist/theme.css`.

### SCSS module hierarchy (all under `src/scss/`)

| File | Role |
|---|---|
| `_variables.scss` | Design tokens: 40+ color primitives (dark + light), font stacks, spacing, radii |
| `_mixins.scss` | `focus-ring`, `compact-density`, `reduced-motion` mixins |
| `_base.scss` | Maps SCSS variables to Obsidian CSS custom properties on `:root`, `.theme-dark`, `.theme-light`. Also contains global UI rules (nav, metadata, search, tags) |
| `components/_editor.scss` | Markdown rendering and CodeMirror 6 syntax highlighting (`.cm-s-obsidian` token colors) |
| `components/_ribbon.scss` | Left sidebar ribbon (Obsidian's Activity Bar analog) |
| `components/_tabs.scss` | Workspace tab headers with active-state accent underline |
| `components/_modals.scss` | Command palette, prompts, suggestion popups |
| `components/_file-icons.scss` | Custom icon font (`monokai-pro-icons`) for file tree, plus monochrome toggle |
| `plugins/_graph.scss` | Graph view: node/line colors, panel controls, focus ring animation |
| `plugins/_canvas.scss` | Canvas card colors mapped to the 6-color Monokai spectrum |
| `plugins/_style-settings.scss` | Dynamic toggles: 5 filter themes (Machine/Octagon/Ristretto/Spectrum), compact mode, monochrome icons, user-overridable accent/link/code colors via `body` classes |

The entry point is `src/main.js`, which only imports `src/scss/index.scss`. That file forwards `variables → mixins → base → components → plugins`.

### Style Settings config (`src/css/style-settings/`)

These `*.css.md` files contain YAML metadata blocks parsed by the `obsidian-style-settings` community plugin. They are sorted alphabetically and concatenated at the end of `theme.css` by the Vite plugin. Files: `00-overview`, `10-palette`, `20-density`, `30-icons`, `40-typography`, `50-accents`.

### Key Obsidian CSS variables

The theme works by setting Obsidian's documented CSS custom properties. The most important groups:
- `--background-primary/secondary` — main editor vs sidebar backgrounds
- `--text-normal/muted/faint` — text hierarchy
- `--text-accent`, `--interactive-accent` — call-to-action magenta
- `--h1-color` through `--h6-color` — heading color cascade (magenta → orange → yellow → green → cyan → purple)
- `--link-color`, `--link-external-color` — cyan links
- `--blockquote-border-color` — green border
- `--code-*` — code syntax token colors
- `--nav-item-*`, `--ribbon-background` — navigation chrome
- Custom `--monokai-*` variables — internal bridge variables for filters and user overrides

## Constraints

- **No `@import` of external resources** — Obsidian's review process rejects themes that fetch remote fonts/assets at runtime. All assets must be inlined (the icon font is Base64-encoded in `_file-icons.generated.scss`).
- **No `!important`** — Obsidian's CSS cascade relies on specificity; `!important` breaks user CSS snippets.
- **No ID selectors** — enforced by Stylelint; use classes only.
- The theme targets Obsidian 1.0.0+ (`minAppVersion` in manifest.json), which introduced the CSS variable system.
