# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A CSS framework (Sass sources) that restyles arbitrary web pages for **print**
output. This repo is a **maintenance fork** of [BafS/Gutenberg](https://github.com/BafS/Gutenberg),
whose upstream has had no activity since 2023-02. See `ROADMAP.md` for planned
work and `CHANGELOG.md` for what has changed since the fork point (upstream
v0.7.0).

## Commands

| Task | Command |
| --- | --- |
| Install | `npm ci` (requires Node >= 20.19) |
| Build `dist/` | `npm run build` |
| Watch + rebuild on save | `npm run watch` (non-minified only) |
| Lint | `npm run lint` (alias: `npm test`) |
| Lint with autofix | `npx stylelint "scss/**/*.scss" --fix` |

There is **no test suite** — `npm test` runs stylelint. "Testing" a change means
`npm run build` and visually checking print output via `docs/` (see below).

### Verifying a visual change

Serve the repo root over HTTP (e.g. `npx serve .`) and open
`docs/modern.html` / `docs/oldstyle.html`, then use the browser's **print
preview**. Those demo pages load `../dist/*.css`, so run `npm run build` first.

## Architecture

### Build pipeline

`scripts/build.mjs` shells out to the **Dart Sass CLI** (`node_modules/.bin/sass`)
once for `--style=expanded` and once for `--style=compressed`, over the four
entrypoints (`scss/gutenberg.scss` + the three themes). Output mirrors the
source tree: `scss/gutenberg.scss` -> `dist/gutenberg.css` +
`dist/gutenberg.min.css`; `scss/themes/modern.scss` -> `dist/themes/modern.*`.
`--watch` mode (expanded only) is `npm run watch`.

The one `node_modules` import (`@use 'normalize.css/normalize'` in
`scss/gutenberg.scss`) is resolved with `--load-path=node_modules`, passed in
`scripts/build.mjs` — not a `~` prefix.

A `sass` upgrade can change how colors serialize (e.g. `color.adjust()` output
moved from `#262626` to `rgb(15%, 15%, 15%)` — same color). That reaches `dist/`,
so diff `dist/` after any `sass` bump and expect a possible one-line churn in
`dist/themes/modern.*`.

**`dist/` is committed and must stay in sync with `scss/`.** CI fails the build
if `git diff -- dist` is non-empty after `npm run build`. Always rebuild and
commit `dist/` in the same change as any `scss/` edit.

### Sass source layout

- `scss/gutenberg.scss` — the only real entry point; `@use`s `_banner`,
  `@forward`s `variables`, `@use`s normalize.css, then the partials in order:
  `_print-reset` -> `_pagination` -> `_page` -> `_reformat` -> `_utilities`.
- `scss/_banner.scss` — the `/*! ... */` header comment; `@use`d first so it
  leads the compiled output.
- `scss/_variables.scss` — every value is `!default`. Consumers override via
  `@use 'gutenberg' with (...)` (the entry `@forward`s it). Partials that need
  variables `@use '...variables' as *` themselves. Colors default to black/grey
  ("black prints faster").
- `scss/_print-reset.scss` — strips shadows/backgrounds, normalizes typography
  for paper.
- `scss/_pagination.scss` — `break-*` control, `orphans`/`widows`.
- `scss/_page.scss` — `@page` margins from the `$page-padding-*` variables.
- `scss/_reformat.scss` — expands `a[href]` and `abbr[title]` into visible text
  via `::after { content: attr(...) }`; suppressed by the `.no-reformat` class
  handled in `_utilities.scss`.
- `scss/_utilities.scss` — public classes: `.no-print`, `.break-before` /
  `.break-after` / `.page-break*`, `.avoid-break-inside`, `.no-reformat`.
- `scss/themes/{modern,oldstyle,book}.scss` — standalone stylesheets compiled
  to `dist/themes/`, nothing from the core except `@use '../variables' as *`
  (`book` uses no variables, so it has no `@use`). `book` is experimental.

### Conventions to preserve

- **Indentation in `scss/` (and `css`/`html`) is tabs**, per `.editorconfig`;
  JS/JSON/YAML use 2 spaces.
- **Deprecated properties are emitted on purpose as fallbacks.** `page-break-*`
  is written alongside standard `break-*`, and `word-wrap` alongside
  `overflow-wrap` — legacy first, standard second. `.stylelintrc.js` disables
  `property-no-deprecated` only for `page-break-*` / `word-wrap`; any other
  deprecated property is still an error. When modernizing away a fallback,
  re-enable the corresponding rule.
- `.stylelintrc.js` disables a handful of stylistic rules with an inline reason
  each; treat that list as the record of deliberate deviations.

## Release & commit flow

Commits **must** follow Conventional Commits — a husky `commit-msg` hook runs
commitlint, and a `pre-commit` hook runs `lint-staged` (`stylelint --fix` on
staged `.scss`).

`release-please` (`.github/workflows/release-please.yml`) watches `master` and
maintains an open "release X.Y.Z" PR that bumps `package.json` /
`package-lock.json` / `.release-please-manifest.json` and regenerates
`CHANGELOG.md` from commit history. **Merging that PR** (with a merge commit,
not squash) is what cuts a release: it tags `vX.Y.Z` and creates a GitHub
Release.

Version bumping while < 1.0.0 (`release-please-config.json`): `feat` -> minor,
`fix` -> patch, breaking change -> minor (never auto-jumps to 1.0.0).

The GitHub Release body is generated separately from `CHANGELOG.md`; if it needs
correcting, `gh release edit vX.Y.Z --notes-file <file>`.

release-please turns `@word` in a commit subject into a GitHub @mention link
(`@use` -> a broken `github.com/use` link). Wrap at-rule names in backticks in
commit subjects (`` `@use` ``), or expect to fix the changelog and release body
by hand afterward.

### Distribution

Not published to npm. Compiled CSS is consumed from tagged releases via jsDelivr:
`https://cdn.jsdelivr.net/gh/shotakaha/Gutenberg@vX.Y.Z/dist/gutenberg.min.css`.

## CI workflows

- `ci.yml` — lint + build + `dist/` sync check on a single Node version, on push
  to `master` and on PRs.
- `pages.yml` — builds and deploys `docs/` (plus a fresh `dist/`) to GitHub
  Pages: <https://shotakaha.github.io/Gutenberg/>.
- `release-please.yml` — see above.

## Known constraints

- Nothing outstanding. `sass` tracks a caret range and Dependabot keeps it
  current; a bump may produce the `dist/themes/modern.*` color-format churn
  described in the Build pipeline section.
