/**
 * Stylelint (with stylelint-config-standard-scss) replaced the abandoned
 * sass-lint. It runs in CI and as a pre-commit hook, as a regression net.
 *
 * The rules turned off below correspond to deliberate choices in the sources,
 * not defects. Each notes why. When a source is modernised so a rule no longer
 * fires, re-enable the rule in the same commit.
 */
module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    // `page-break-*` and `word-wrap` are emitted on purpose, each paired with
    // its standard successor (`break-*` / `overflow-wrap`) as a fallback for
    // older print engines. Any *other* deprecated property is still an error.
    'property-no-deprecated': [
      true,
      { ignoreProperties: [/^page-break-/, 'word-wrap'] },
    ],

    // -webkit-/-moz-osx-font-smoothing have no unprefixed equivalent; the
    // ::-webkit-/-moz-/-ms- placeholder selectors target old browsers on
    // purpose. Everything else prefixed is an error.
    'property-no-vendor-prefix': [true, { ignoreProperties: ['font-smoothing', 'osx-font-smoothing'] }],
    'selector-no-vendor-prefix': [true, { ignoreSelectors: ['/-(webkit|moz|ms)-.*placeholder/'] }],

    // Pre-existing style; churn-only if "fixed".
    'value-keyword-case': null, // font-family names kept capitalised
    'declaration-block-no-redundant-longhand-properties': null,
    'font-family-name-quotes': null,
    'scss/comment-no-empty': null, // `//` section separators
    'scss/dollar-variable-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    'at-rule-empty-line-before': null,
  },
};
