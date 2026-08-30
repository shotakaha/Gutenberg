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
- `fix`: `lighten()` -> `color.adjust()` (Dart Sass deprecation).
- `docs/` published on GitHub Pages via Actions
  (<https://shotakaha.github.io/Gutenberg/>); demos load the freshly built
  `dist/` instead of the upstream npm package. Compiled CSS is also consumable
  from tagged releases through jsDelivr.

## Next — small, low risk

- [ ] **`page-break-*` -> add standard `break-*`.** Keep the legacy properties,
      emit the standardised ones alongside them
      (`_pagination.scss`, `_utilities.scss`, `themes/book.scss`). Then re-enable
      the `property-no-deprecated` rule in `.stylelintrc.js`.
- [ ] **`:before` / `:after` -> `::before` / `::after`.** Mechanical, no output
      change. Fork-only — do not send upstream (pure style churn). Re-enable
      `selector-pseudo-element-colon-notation` afterwards.
- [ ] **`word-wrap` -> `overflow-wrap`** (keep `word-wrap` as the fallback).

## Later — larger changes

- [ ] **`@import` -> `@use` / `@forward`.** Dart Sass has deprecated `@import`.
      Touches every `scss/` file plus the `~normalize.css` tilde import and the
      gulp importer config; do it as one focused change.
- [ ] **Replace gulp with the `sass` CLI.** The whole `npm audit` backlog lives
      in the gulp 4 devDependency tree (build-time only). Drop `gulpfile.js` for
      a couple of `sass` CLI calls + small npm scripts; rewrite the `~` import as
      a relative path (only used for `normalize.css`). Keep `dist/` output
      identical.
- [ ] **Add `.github/dependabot.yml`** once the toolchain is settled, so
      dependency bumps arrive as PRs.

## Upstream contributions

Upstream has had no activity since 2023-02. Candidates to offer as small,
self-contained PRs (no expectation of a response):

- `lighten()` -> `color.adjust()` (already in this fork).
- `page-break-*` -> `break-*`, once done here.

Style-only changes (`::before`, empty-line rules, keyword casing) stay in the
fork and are not sent upstream.

## Explicitly out of scope

- Renaming the npm package. Not published; revisit only if publishing.
- A documentation-site generator. The demo HTML in `docs/` is enough.
