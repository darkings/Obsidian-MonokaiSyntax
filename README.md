# Monokai Syntax

[Chinese README](./README.zh.md)

Monokai Syntax is a Monokai Pro inspired theme for Obsidian. It is designed for code learning notes, long-form technical writing, and daily knowledge work where reading mode, Live Preview, file navigation, code blocks, callouts, Graph view, and Canvas should feel like one coherent workspace.

![Monokai Syntax](./MonokaiSyntax.png)

## Version

Current version: `1.1.8`

Minimum Obsidian version: `1.5.8`

## What's New In 1.1.8

- **Compatibility:** `minAppVersion` lifted `1.0.0 → 1.5.8` to silence `css-relative-colors / css-scrollbar / text-decoration` warnings (Obsidian 1.5.8 ≈ Electron 28 / Chrome 118 fully supports `rgb(from ...)` / `color-mix`).
- **Bundle size:** `icons.woff (14.1KB) → icons.woff2 (11.6KB)` via `fontTools + brotli` (`+18%` smaller base64), `font-display: swap` already landed; `theme.css` `161KB → ~158KB` (gzip `~34.7KB`).

> For older versions, see [CHANGELOG.md](./CHANGELOG.md).

## Highlights

- Monokai Pro **Default (Pro/Octagon #2D2A2E)** dark palette and a tuned Light paper palette (`#FAF8F2`).
- Style Settings palette selector with `Follow system`, `Pro` (default), and `Light`; single-source `monokai-filter` mixin covering 80 semantic tokens.
- CodeMirror 6 syntax mapped to spectrum `#FF6188 #FC9867 #FFD866 #A9DC76 #78DCE8 #AB9DF2`; keyword-only italic by default, optional type/decorator italics.
- Reading mode and Live Preview share semantic spacing, typography, code, callout, blockquote, tag, task, table, and link variables.
- CJK-friendly font stacks: `Inter + Noto Sans SC / PingFang SC` and `Fira Code + JetBrains Mono / Maple Mono`.
- File tree icons for Markdown, project, config, code and Obsidian files; first-level keeps native chevron, nested uses Monokai marker.
- Code learning callouts for `concept`, `syntax`, `api`, `debug`, `pitfall`, `exercise`, `answer`, `source`, `output`, and `terminal`; rail style with `6%/12%` sidebar tokens.
- Task states, API parameter tables (responsive, `anywhere` wrap), inline code, code blocks (distinct light background), Mermaid, Math, Dataview, embeds, images, tags, links and footnotes optimized for technical notes.
- Graph view, Canvas, Ribbon, tabs, modals, search, settings and plugin surfaces follow the same tokens; no remote assets, icon font bundled as inline `woff` (`swap`, `woff2` auto).
- Full verification: `check:contrast` (30 pairs), `audit:css` (no `!important`/remote), `verify:palette/active-visual` and 39 unit tests.

## License

MIT. See [LICENSE.md](./LICENSE.md).
