# Changelog

All notable changes to **Monokai Syntax** are documented here. This project adheres to [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/) principles.

> `README.md` keeps only the latest release. See below for full history.

---

## [1.1.8] - 2026-08-21

### Changed
- **Compatibility:** `minAppVersion` `1.0.0 → 1.5.8` (`manifest.json`, `versions.json: 1.1.8 → 1.5.8`). Silences `css-relative-colors` / `css-scrollbar` / `text-decoration` warnings flagged under Obsidian 1.4.5 viewport. Obsidian 1.5.8 ≈ Electron 28 / Chrome 118 fully supports `rgb(from ...)` and `color-mix`.
- **Bundle size:** `icons.woff 14,148B → icons.woff2 11,616B` via `fontTools 4.63 + brotli 1.2` (`-18%` base64), `font-display: block → swap` (landed in 1.1.7, now effective). `theme.css` `161,982B → 158,699B` (`dist 150.85KB`, `gzip 31.97KB`). `generate-icon-theme.js` now prefers `woff2` if present.

### Fixed
- `scripts/audit-css.js`, `verify-icons.js`, `verify-generated.js` now accept `data:font/woff2;base64` in addition to `woff`, fixing CI `verify:artifact` / `verify:icons` failures after woff2 switch.

**Commits:** `c8ff164` `dadfd70` | **Tag:** `1.1.8` | **Release:** `https://github.com/darkings/Obsidian-MonokaiSyntax/releases/tag/1.1.8`

---

## [1.1.7] - 2026-08-21

Monokai Pro **Default filter (Pro/Octagon #2D2A2E)** fidelity + editor engineering polish.

### Added
- Style Settings toggles `Type italic` / `Decorator italic` (under Typography, off by default) to keep Pro's keyword-only italic.

### Changed
- **Palette fidelity:** `H1` `#FF9AB0 → #FF6188` (now `$color-pro-magenta`, differentiated by `font-weight:700`); sidebar `hover #403E41 → #3D3A3E` separated from `border #403E41`, divider `4% → 6%`, thumb `10% → 12%`; code comment `#727072 → #7A757C` (contrast `3.32 → 3.62`, threshold `3 → 3.5` via `$color-pro-comment`).
- **Light palette:** codeblock `background #F0EEE7 → #EBE8DF`, `border #D2CEC4 → #C8C2B2 (1.45:1)`, `header #EDE9DF`; `check-contrast` fixtures aligned to real tokens `#FAF8F2 / #F0EEE7 / #EBE8DF`.
- **Typography:** `Inter → Inter + Noto Sans SC / PingFang SC / Microsoft YaHei`; mono `Fira Code + JetBrains Mono / Maple Mono / Noto Sans Mono SC`.
- **Gutter:** `translateX(-100% + 0.25rem)` hack → `display:flex` with `padding-inline-end:1rem` + `transform:none` (robust across zoom).
- **Tables:** `--table-max-width min(100%,62rem) → 100%`, `--table-min-width min(100%,48rem) → fit-content`, wrapper `overflow-x:auto`, `th:first-child 5.5rem nowrap → 0 anywhere`, `table { max-width:none; min-width:fit-content; width:100% }` + `@media (width <=768px) { th,td padding 0.4rem 0.6rem }` — narrow tables stretch, wide tables scroll, mobile friendly.
- **Interactions:** tag `translateY/box-shadow → border-color` only, link underline `0.3s → 200ms + will-change`; unified `focus-visible` rings for file tree, tags, graph, canvas (`_base.scss`, `_graph.scss`, `_canvas.scss`).
- **Engineering:** single-source `$color-pro-comment`, `--monokai-editor-selection-background` aliases `--monokai-selection-background`; font `display: swap`; checkbox `border-width 1.5px`.
- **Polish:** `blockquote` shadow removed in dark (`theme-dark` override), kept in light; `CODE` label `inset-inline-end +1.8rem` to avoid `Copy` button overlap; default palette `Follow system → Pro` (`10-palette.css.md`).

### Fixed
- `test/monokai-pro-polish.test.js` and `test/optimization-guardrails.test.js` updated to assert new gutter (`display:flex`, `transform:none`) and new palette values.
- `scripts/verify-style-polish.js` relaxed to accept `100%|fit-content` and `var(--monokai-selection-background)` for moved tables/codeblock.
- `scripts/check-contrast.js` backgrounds corrected to real tokens.

**Commits:** `c5d3eaf`, `aa11e0b` | **Tag:** `1.1.7` | **CI/Release:** both `success` after fix commit `aa11e0b`

---

## [1.1.6] - 2026-08-19

### Added
- Style Settings → Typography → **Line numbers display** (`Default / Follow Obsidian`, `Show`, `Hide`) via `monokai-syntax-line-numbers-*`.

### Fixed
- Folder arrow rotation for nested folders (level 2+) now points down when expanded and right when collapsed, with `0.25s cubic-bezier` transition.
- Light mode settings modal content background: `pure white → soft warm Monokai paper #FAF8F2` surfaces.

**Tag:** `1.1.6` | **Release:** `2026-08-19T14:11:47Z`

---

## [1.1.5] - 2026-07-30

### Added
- Style Settings user-facing strings fully bilingual (English + Chinese) — `name/title/description/label` regex check in `test/monokai-pro-polish.test.js`.

### Changed
- Heading and emphasis polish: title / bold / italic color variables refined.

**Commits:** `ed06833`, `1f492be` | **Tag:** `1.1.5`

---

## [1.1.4] - 2026-07-23

### Changed
- Code highlighting and Callout editing experience optimized; `README` simplified in both languages.

**Commits:** `5f03125`, `6cbb831` | **Tag:** `1.1.4`

---

## [1.1.3] - 2026-07-23

### Fixed
- Community theme interface fixes (recorded in `docs/Monokai Pro – 社区主题界面修复设计`).

**Commits:** `34b258b`, `8f8d1bb` | **Tag:** `1.1.3`

---

## [1.1.2] - 2026-07-18

Large baseline polish batch (11 commits between `1.1.1..1.1.2`, `dc2c4c5` → `c2ac892`):

### Fixed / Changed
- **Layout:** unified `codeblock` controls, `mermaid/math/dataview` plugin surfaces.
- **Editor:** split `_editor.scss` into `tokens / reading / source / syntax / links` modules (`@forward`).
- **Build:** enabled `vite --cssMinify` compressed output.
- **File tree:** weakened selection state, removed left bar, fixed double divider, weakened scrollbar interference.
- **Reading view:** optimized table reading/edit styles.
- **Tokens:** sorted base variables and motion tokens (`--radius`, `--monokai-transition-*`).

**Tag:** `1.1.2`

---

## [1.1.1] - 2026-06-27

### Fixed
- Corrected GitHub Release tag notes and Obsidian publish label documentation.

**Commits:** `69506e4`, `b7db2bd`, `48ce735` | **Tag:** `1.1.1`

---

## [1.1.0] - 2026-06-27

### Added
- **Monokai Pro parity:** full `monokai-filter` mixin (80+ variables), spectrum `#FF6188 #FC9867 #FFD866 #A9DC76 #78DCE8 #AB9DF2`, `Graph / Canvas / Ribbon / Tabs / Modals` unified tokens.

**Commits:** `4bc66db → f601cd2 → 9d010e9` | **Tag:** `1.1.0`

---

## [1.0.2] - 2026-06-22

### Changed
- Engineering quality & style optimization: `verify:versions`, `verify:palette`, `verify:graph`, `verify:active-visual` pipelines added; left ribbon background fixed.

**Commit:** `4bc66db` | **Tag:** `1.0.2` (no GitHub Release)

---

## [1.0.1] - 2026-05-15

### Fixed
- Eliminated Obsidian CSS audit warnings (`!important`, `id` selectors, `stylelint-disable` in artifact, remote URLs).
- Corrected GitHub Release tag rule (`v*` vs `[0-9]*`).

**Commits:** `642baf0`, `6bf9800`, `3d8ff07`, `11814ca`, `f963a19` | **Tag:** `1.0.1` | **Release:** `2026-05-15`

---

## [1.0.0] - 2026-05-13

### Added
- Initial **Monokai Syntax** Obsidian theme: Monokai Pro dark + Light paper palettes, `Style Settings` palettes, CodeMirror 6 spectrum, Reading/Live Preview shared variables, file tree icons, callouts (`concept/syntax/api/...`), tasks, tables, code blocks, Graph/Canvas.
- `theme.css` output to repo root, `screenshot.png` (512×288), `icons/` font (14 `icon-theme.json` → later simplified), `CHANGELOG` and GitHub Actions CI/Release workflows (`5bd19eb`).

**Commit:** `923be75` (also `16a6554`) | **Tag:** `1.0.0` | **Release:** `Monokai Syntax 1.0.0` `2026-05-13T09:35:26Z`

---

## Links

- [Unreleased]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.8...HEAD
- [1.1.8]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.7...1.1.8
- [1.1.7]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.6...1.1.7
- [1.1.6]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.5...1.1.6
- [1.1.5]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.4...1.1.5
- [1.1.4]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.3...1.1.4
- [1.1.3]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.2...1.1.3
- [1.1.2]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.1...1.1.2
- [1.1.1]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.0...1.1.1
- [1.1.0]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.0.1...1.1.0
- [1.0.1]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.0.0...1.0.1
- [1.0.0]: https://github.com/darkings/Obsidian-MonokaiSyntax/releases/tag/1.0.0
