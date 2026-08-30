# Roadmap

Work planned for this maintenance fork of [BafS/Gutenberg](https://github.com/BafS/Gutenberg).
This is a single-maintainer list, not an issue tracker — items move to a branch (`<type>/<topic>`) when started and are dropped from here once merged.
Released changes are recorded in [CHANGELOG.md](CHANGELOG.md).

## Done

- Mark the repo as a maintenance fork (README / `package.json` / `CHANGELOG`).
- Modern tooling: GitHub Actions CI (lint + build + `dist/` sync check),
  `stylelint` in place of the abandoned `sass-lint`.
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
- **v0.8.2** — build overhaul: replaced gulp with a small `scripts/build.mjs`
  calling the Dart Sass CLI; migrated every `@import` to `@use` / `@forward`;
  `normalize.css` resolved via `--load-path=node_modules`. `npm audit` went from
  29 vulnerabilities to 0. `sass` pinned to 1.58.x (newer versions reserialise
  colors).
- **Housekeeping** (ships in the next release) — refreshed `.stylelintrc.js`;
  `package.json` metadata tidy; `--no-install` on the pre-commit hook; removed
  dead comments, the redundant `& {}` nesting, the `-webkit-/-moz-box-sizing`
  prefixes, and the HTML5-obsolete `acronym` selectors; re-enabled
  `block-no-redundant-nested-style-rules` and the (scoped) vendor-prefix rules;
  CI narrowed to a single Node version.

## Next

Nothing queued.

## Bigger follow-ups (when there's appetite)

- [ ] **Unpin `sass`.** Move to a current release and absorb the color
      serialization change (`#262626` -> `rgb(15%, 15%, 15%)`, same color) in
      `dist/` in one deliberate commit; then let Dependabot keep it current.
      Pinned to 1.58.x since the build overhaul — treat as tracked debt.
- [ ] **Visual regression tests.** A headless print-to-PDF snapshot of the
      `docs/` pages would catch `dist/` regressions the sync check can't.
- [ ] **`@page` margin-box utilities** (running headers / page numbers) — a real
      feature, worth an upstream PR.
- [ ] **Namespace the `@use` imports** (`@use '../variables' as v;` +
      `v.$name`), if churn ever feels worth it. `as *` is a deliberate choice
      for now.

## Upstream contributions

Upstream has had no activity since 2023-02. Candidates to offer as small,
self-contained PRs (no expectation of a response):

- `lighten()` -> `color.adjust()` (in this fork since v0.8.0).
- `page-break-*` -> `break-*` fallbacks (in this fork since v0.8.0).

Style-only changes (`::before`, empty-line rules, keyword casing), the
build-tooling overhaul, and the housekeeping cleanup stay in the fork and are
not sent upstream.

## Explicitly out of scope

- Renaming the npm package. Not published; revisit only if publishing.
- A documentation-site generator. The demo HTML in `docs/` is enough.
