<p align="center">
	<img width="470" alt="Gutenberg" src="http://i.imgur.com/NlGJI3v.png">
</p>

> Modern framework to print web pages correctly

[![license](https://img.shields.io/npm/l/gutenberg-css.svg?style=flat-square)]()

> **Note — this is a maintenance fork.**
> The upstream project [BafS/Gutenberg](https://github.com/BafS/Gutenberg) has had no
> activity since February 2023. This fork ([qumasan/Gutenberg](https://github.com/shotakaha/Gutenberg))
> continues maintenance: dependency updates, tooling modernization, and small
> improvements. Feature changes are also submitted upstream as pull requests when
> possible, but there is no guarantee they will be merged there.
>
> See [CHANGELOG.md](CHANGELOG.md) for what has changed since the fork point
> (v0.7.0), and [ROADMAP.md](ROADMAP.md) for what is planned.

# How to use

Load the base stylesheet for the printer only; add a theme from `dist/themes/`
if you want one. The compiled CSS lives in `dist/` — copy it into your project,
or, since the repo is public, pull a tagged version through a GitHub-backed CDN
such as [jsDelivr](https://www.jsdelivr.com/):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/shotakaha/Gutenberg@v0.8.4/dist/gutenberg.min.css" media="print">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/shotakaha/Gutenberg@v0.8.4/dist/themes/oldstyle.min.css" media="print"> <!-- optional -->
```

Bump the tag to whatever the [releases](https://github.com/shotakaha/Gutenberg/releases)
page shows; pin it rather than tracking `@latest`.

This fork is not published to any package registry. The original project is on
npm as `gutenberg-css`, last published by the upstream author at v0.7.0.

![comparison](https://i.imgur.com/tL5cHhn.png)

> Comparison between standard print (left) and Gutenberg (middle, Modern style and right, Old style)

## Demo

The `docs/` pages are served at <https://shotakaha.github.io/Gutenberg/> (GitHub
Pages) — open one and use your browser's print preview to see the result.


# What does the framework do?

### Hide elements

To hide elements to be printed you can simply add the class `no-print`.

### Force break page

Gutenberg provides two ways to break a page: the class `break-before` breaks before the element and `break-after` breaks after it.

Example:

```html
<!-- The title will be on a new page -->
<h1 class="break-before">My title</h1>

<p class="break-after">I will break after this paragraph</p>
<!-- Break here, the next paragraph will be on a new page -->
<p>I am on a new page</p>
```

### Avoid break inside

To avoid the page to break "inside" an element, you can use the `avoid-break-inside` class.

Example:

```html
<div class="avoid-break-inside">
  <img src="gutenberg.png" />

  <p>I really don't want this part to be cut</p>
</div>
```

### Not reformat links or abbreviations

By default a printed `<a>` shows its URL and an `<abbr title>` shows its title in
parentheses. Add the class `no-reformat` to suppress that on an element.

### Force to print background

To force backgrounds to be printed (can be useful when you "print" a pdf), add this CSS (compatible with Safari and Chrome):

```css
-webkit-print-color-adjust: exact;
        print-color-adjust: exact;
```

## Dev

Requires Node >= 20.19.

 - `npm ci` — install dependencies
 - `npm run build` — compile `scss/` to `dist/` (expanded + minified)
 - `npm run watch` — recompile on change
 - `npm run lint` — stylelint over `scss/`

`dist/` is committed and kept in sync with `scss/`; CI fails if a build would
change it. See [CLAUDE.md](CLAUDE.md) for the build pipeline and release flow.
