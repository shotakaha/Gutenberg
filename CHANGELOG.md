# Changelog

All notable changes to this fork are documented here.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This is a maintenance fork of [BafS/Gutenberg](https://github.com/BafS/Gutenberg).
The fork point is upstream **v0.7.0** (commit `cec4afe`, 2023-02-22), which is the
last release published by the original author. Entries below cover changes made
in this fork since that point.

## [Unreleased]

### Changed

- Point `repository`, `bugs`, and `homepage` in `package.json` at the fork.
- README: add a maintenance-fork notice; drop dead Travis CI and Code Climate
  badges that referenced upstream infrastructure that is no longer running.
- Replace the abandoned `sass-lint` linter with `stylelint` +
  `stylelint-config-standard-scss`. The config is tuned so the current sources
  pass unchanged (see `.stylelintrc.js` for the disabled rules and why); it acts
  as a regression net, not a mass rewrite.
- `npm test` now runs `npm run lint` (was `sass-lint`).
- Raise `engines.node` from `>=8.0` to `>=20.19` (minimum required by
  stylelint 17).
- `package-lock.json` migrated from lockfile v1 to v3 (npm 7+ format) as a side
  effect of installing stylelint.

### Added

- This `CHANGELOG.md`.
- GitHub Actions CI (`.github/workflows/ci.yml`): lint + build on Node 20/22/24,
  and a check that `dist/` is in sync with `scss/`.
- `npm run lint` script.

### Removed

- `.travis.yml`, `.sass-lint.yml`, `.codeclimate.yml` — all tied to services or
  linters that are no longer used.

### Known issues

- `npm audit` reports vulnerabilities entirely within the `gulp` 4 devDependency
  tree (build-time only, nothing ships in `dist/`). Clearing them requires
  replacing or major-upgrading the build tool, deferred to its own change.

---

For the history up to and including v0.7.0, see the
[upstream releases](https://github.com/BafS/Gutenberg/releases).
