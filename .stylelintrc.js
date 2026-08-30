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

    // Legacy print-engine compatibility, kept on purpose.
    'property-no-vendor-prefix': null, // -webkit-/-moz-box-sizing
    'selector-no-vendor-prefix': null, // ::-webkit-input-placeholder etc.

    // Pre-existing style; churn-only if "fixed".
    'value-keyword-case': null, // font-family names kept capitalised
    'declaration-block-no-redundant-longhand-properties': null,
    'block-no-redundant-nested-style-rules': null,
    'font-family-name-quotes': null,
    'scss/comment-no-empty': null, // `//` section separators
    'scss/dollar-variable-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    'at-rule-empty-line-before': null,
  },
};
