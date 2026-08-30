'use strict';

/**
 * Stylelint replaces the abandoned sass-lint. It is wired in as a regression
 * net for future changes, so the config is deliberately tuned to let the
 * current v0.7.0 sources pass untouched.
 *
 * The rules disabled below flag intentional or cosmetic choices in the existing
 * SCSS, not defects. Modernizing any of them (e.g. `page-break-*` -> `break-*`)
 * is a content change that belongs in its own commit / upstream PR, at which
 * point the corresponding rule here should be re-enabled.
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
    'selector-pseudo-element-colon-notation': null, // :before / :after
    'declaration-block-no-redundant-longhand-properties': null,
    'block-no-redundant-nested-style-rules': null,
    'font-family-name-quotes': null,
    'scss/comment-no-empty': null, // `//` section separators
    'scss/dollar-variable-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    'at-rule-empty-line-before': null,
  },
};
