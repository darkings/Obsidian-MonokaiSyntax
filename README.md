# Monokai Syntax

[Chinese README](./README.zh.md)

Monokai Syntax is a Monokai Pro inspired theme for Obsidian. It is designed for code learning notes, long-form technical writing, and daily knowledge work where reading mode, Live Preview, file navigation, code blocks, callouts, Graph view, and Canvas should feel like one coherent workspace.

![Monokai Syntax](./MonokaiSyntax.png)

## Version

Current version: `1.1.9`

Minimum Obsidian version: `1.5.8`

## What's New In 1.1.9

- **Performance:** file-tree active indicator moved from `inset box-shadow` to a composited `::after` bar (`opacity` + `scaleY`), eliminating repaint cost on high-frequency tree transitions; `will-change: background-size` removed from links.
- **Consistency:** code `Copy` button now uses progressive disclosure in both Reading and Source/Live Preview (`opacity 0.3` at rest, `1` on hover/focus); link underline animation scoped from global `body a` to note content only (`.markdown-rendered` / `.cm-link`), keeping global `a:focus-visible` for UI links.
- **Engineering:** 7 unused SCSS variables removed; duplicate selectors merged via `:is()`; verify/test assertions updated to the new `:is()` / `::after` structure.

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
