# Roadmap

Planned work for this maintenance fork of [BafS/Gutenberg](https://github.com/BafS/Gutenberg)
(upstream inactive since 2023-02). Single-maintainer list, not an issue tracker:
an item moves to a `<type>/<topic>` branch when started and is dropped from here
once merged. Shipped changes are in [CHANGELOG.md](CHANGELOG.md).

## Status

The maintenance base is in place: GitHub Actions CI (lint + build + `dist/` sync
check), stylelint, commitlint + husky, release-please, a GitHub Pages demo,
jsDelivr distribution, and Dependabot. No pinned dependencies, zero `npm audit`
findings, Dart Sass current, no deprecated APIs in the sources.

## Next

Nothing queued.

## Candidates (when there's appetite)

- [ ] **Visual regression tests.** A headless print-to-PDF snapshot of the
      `docs/` pages would catch `dist/` regressions the sync check can't.
- [ ] **`@page` margin-box utilities** (running headers / page numbers) — a real
      feature, worth an upstream PR.
- [ ] **Namespace the `@use` imports** (`@use '../variables' as v;` +
      `v.$name`), if churn ever feels worth it. `as *` is a deliberate choice
      for now.

## Upstream contributions

Upstream has had no activity since 2023-02. Small, self-contained PRs already
offered / worth offering (no expectation of a response):

- `lighten()` -> `color.adjust()` (in this fork since v0.8.0).
- `page-break-*` -> `break-*` fallbacks (in this fork since v0.8.0).

Style-only changes (`::before`, empty-line rules, keyword casing), the
build-tooling overhaul, and the housekeeping cleanup stay in the fork.

## Explicitly out of scope

- Renaming the npm package. Not published; revisit only if publishing.
- A documentation-site generator. The demo HTML in `docs/` is enough.
