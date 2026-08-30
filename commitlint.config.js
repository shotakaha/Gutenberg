/**
 * Conventional Commits are enforced on commit-msg (via husky).
 * release-please parses the same history to compute the next version and
 * generate the changelog, so keep the type list in sync with what
 * release-please recognises.
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
