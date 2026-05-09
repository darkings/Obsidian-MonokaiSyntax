# Monokai Syntax

[中文](./README.md) | [GitHub](https://github.com/Darkings/Obsidian-MonokaiSyntax)

Monokai Syntax is a community theme for Obsidian that aims to reproduce the Monokai Pro dark and light visual language in knowledge management contexts.

![Monokai Syntax](./MonokaiSyntax.png)

## Next Version Plan

- Polish project icons
- Refine project details
- Improve Style Settings plugin integration

## Project Status

Currently in early development stage. The foundational engineering scaffolding, Vite build pipeline, Stylelint checks, and test vault sync workflow are complete.

## Install Dependencies

```powershell
npm install
```

## Common Commands

Lint SCSS:

```powershell
npm run lint:css
```

Build the theme:

```powershell
npm run build
```

Build and sync to test vault:

```powershell
npm run build:vault                              # Default vault
npm run build:vault -- D:/your/Obsidian/Vault    # Custom vault
```

## Local Testing

Default test vault path:

```text
C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain
```

To use your own vault, append the path to the command:

```powershell
npm run build:vault -- D:/your/Obsidian/Vault
```

The theme files will be synced to `.obsidian\themes\Monokai Syntax` under the target vault.

You can then enable `Monokai Syntax` in Obsidian's Appearance settings.

## Remote Resource Constraints

The theme CSS must not load remote resources at runtime. Remote `@import`, remote font URLs, or remote image URLs are prohibited in the final theme CSS. Any fonts, icons, or image assets must be localized and their licenses verified.

## License

This project is licensed under the MIT License. See [LICENSE.md](./LICENSE.md) for details.
