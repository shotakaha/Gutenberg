# Roadmap

Work planned for this maintenance fork of [BafS/Gutenberg](https://github.com/BafS/Gutenberg).
This is a single-maintainer list, not an issue tracker — items move to a branch (`<type>/<topic>`) when started and are dropped from here once merged.
Released changes are recorded in [CHANGELOG.md](CHANGELOG.md).

## Done

- Mark the repo as a maintenance fork (README / `package.json` / `CHANGELOG`).
- Modern tooling: GitHub Actions CI (lint + build + `dist/` sync check,
  Node 20/22/24), `stylelint` in place of the abandoned `sass-lint`.
- Commit + release automation: commitlint + husky + lint-staged, and
  release-please for versioning / changelog / tags.
- `docs/` published on GitHub Pages via Actions
  (<https://shotakaha.github.io/Gutenberg/>); demos load the freshly built
  `dist/` instead of the upstream npm package. Compiled CSS is also consumable
  from tagged releases through jsDelivr.
- `CLAUDE.md` for future contributors / agents.
- Dependabot: weekly npm + Actions version updates, plus security alerts /
  automated security fixes.
- **v0.8.0** — `fix`: `lighten()` -> `color.adjust()` (Dart Sass deprecation);
  `feat`: emit standard `break-*` alongside the legacy `page-break-*` properties
  (kept as a fallback), `property-no-deprecated` re-enabled with an
  `ignoreProperties` exception for the deliberate `page-break-*` / `word-wrap`
  fallbacks.
- **v0.8.1** — `fix`: emit `overflow-wrap` alongside legacy `word-wrap`;
  `refactor`: single-colon -> double-colon pseudo-element notation,
  `selector-pseudo-element-colon-notation` re-enabled.
- **Build overhaul** (`build:`, ships in the next release) — replaced gulp with
  a small `scripts/build.mjs` calling the Dart Sass CLI; migrated every
  `@import` to `@use` / `@forward`; `normalize.css` resolved via
  `--load-path=node_modules`. `npm audit` went from 29 vulnerabilities to 0.
  `sass` pinned to 1.58.x (newer versions reserialise colors).

## Next

### Housekeeping (small, low risk — one commit each)

- [ ] `.stylelintrc.js`: rewrite the stale header comment (talks about work
      already done) and drop the redundant `'use strict'`.
- [ ] `package.json`: drop the `eyeglass-module` keyword (the eyeglass block is
      already gone); `browser` -> `style` for the CSS entry.
- [ ] `.husky/pre-commit`: add `--no-install` to match `commit-msg`.
- [ ] Delete dead comments in `scss/` (e.g. `// max-width: 21cm;`).
- [ ] `themes/oldstyle.scss`: remove the redundant `& { ... }` nesting, then
      re-enable `block-no-redundant-nested-style-rules`.
- [ ] Drop the `-webkit-/-moz-box-sizing` prefixes (dead since ~2015); check
      whether `property-no-vendor-prefix` can then be re-enabled.
- [ ] Remove `acronym` selectors (HTML5-obsolete element) from `_reformat.scss`
      / `_utilities.scss` / `_print-reset.scss`.
- [ ] CI: narrow the matrix to a single Node version (the build only shells out
      to `sass`), or document why 20/22/24 is kept.

### Bigger follow-ups (when there's appetite)

- [ ] **Unpin `sass`.** Move to a current release and absorb the color
      serialization change (`#262626` -> `rgb(15%, 15%, 15%)`, same color) in
      `dist/` in one deliberate commit; then let Dependabot keep it current.
      Pinned to 1.58.x since the build overhaul — treat as tracked debt.
- [ ] **Visual regression tests.** A headless print-to-PDF snapshot of the
      `docs/` pages would catch `dist/` regressions the sync check can't.
- [ ] **`@page` margin-box utilities** (running headers / page numbers) — a real
      feature, worth an upstream PR.

## Upstream contributions

Upstream has had no activity since 2023-02. Candidates to offer as small,
self-contained PRs (no expectation of a response):

- `lighten()` -> `color.adjust()` (in this fork since v0.8.0).
- `page-break-*` -> `break-*` fallbacks (in this fork since v0.8.0).

Style-only changes (`::before`, empty-line rules, keyword casing) and the
build-tooling overhaul stay in the fork and are not sent upstream.

## Explicitly out of scope

- Renaming the npm package. Not published; revisit only if publishing.
- A documentation-site generator. The demo HTML in `docs/` is enough.
