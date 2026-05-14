# Development

This document is for contributors and local theme development. User-facing installation notes live in [README.md](./README.md).

## Requirements

- Node.js
- npm
- Obsidian 1.0.0 or later

## Setup

Clone the repository and install dependencies:

```powershell
git clone https://github.com/Darkings/Obsidian-MonokaiSyntax.git
cd Obsidian-MonokaiSyntax
npm install
```

## Common Commands

Run a production build:

```powershell
npm run build
```

Run the SCSS linter:

```powershell
npm run lint:css
```

Run CSS quality checks:

```powershell
npm run check:contrast
npm run audit:css
```

Verify generated theme details:

```powershell
npm run verify:icons
npm run verify:graph
npm run verify:active-visual
```

Run the full pre-release check:

```powershell
npm run release:pack
```

## Watch Build

Use watch mode while editing SCSS:

```powershell
npm run dev
```

## Vault Sync

Build and sync the theme to the default Obsidian vault:

```powershell
npm run build:vault
```

Build and sync to a custom vault:

```powershell
npm run build:vault -- D:/your/Obsidian/Vault
```

The script writes theme files to:

```text
Target Vault/.obsidian/themes/Monokai Syntax/
```

Then enable `Monokai Syntax` from Obsidian's Appearance settings.

## Generated Icons

The icon stylesheet is generated from the local icon font source:

```powershell
npm run generate:icons
```

The same generator runs automatically before `npm run build` and `npm run lint:css`.

## Project Structure

```text
src/main.js                         # Vite entry
src/scss/index.scss                 # SCSS module entry
src/scss/_variables.scss            # Design tokens
src/scss/_base.scss                 # Obsidian CSS variable mapping
src/scss/components/                # Core UI surfaces
src/scss/plugins/                   # Plugin-specific styling
src/css/style-settings/             # Style Settings metadata blocks
scripts/                            # Build, verification, and sync scripts
dist/theme.css                      # Built theme CSS
theme.css                           # Root theme CSS for Obsidian packaging
manifest.json                       # Obsidian theme manifest
```

## Runtime Asset Rule

The final theme CSS must not load remote runtime assets. Do not use remote `@import`, remote font URLs, or remote image URLs. Fonts, icons, and image assets must be local and license-checked.
