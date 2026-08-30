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

Simply include the right stylesheet(s) in your html and load it only for a printer.
Gutenberg.css is the base stylesheet but there are themes available in the `themes` folder.

Example with Gutenberg and "old style" theme :

```html
<link rel="stylesheet" href="dist/gutenberg.css" media="print">
<link rel="stylesheet" href="dist/themes/oldstyle.css" media="print"> <!-- optional -->
```

![comparison](https://i.imgur.com/tL5cHhn.png)

> Comparison between standard print (left) and Gutenberg (middle, Modern style and right, Old style)

## Demo

A live demo of this fork is published from `docs/` at
<https://shotakaha.github.io/Gutenberg/> — open it and use your browser's print
preview to see the result.

## CDN (this fork)

This fork is not published to npm. Reference the compiled CSS straight from a
tagged release via [jsDelivr](https://www.jsdelivr.com/), pinning a version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/shotakaha/Gutenberg@v0.7.0/dist/gutenberg.min.css" media="print">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/shotakaha/Gutenberg@v0.7.0/dist/themes/oldstyle.min.css" media="print"> <!-- optional -->
```

Replace `v0.7.0` with the tag you want (see
[releases](https://github.com/shotakaha/Gutenberg/releases)); `@latest` tracks
the newest tag but is not recommended for production.

## npm (upstream)

The original project is on npm as `gutenberg-css` (last published by the
upstream author at v0.7.0):

```sh
npm install gutenberg-css
```


# What does the framework do ?

### Hide elements

To hide elements to be printed you can simply add the class `no-print`.

### Force break page

Gutenberg provides two ways to break a page, the class `break-before` will to break before and `break-after` to break after.

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

### Not reformat links or acronym

If you do not want to reformat the links, acronym or abbreviation to show the full url or title, you can use the class `no-reformat`.

### Force to print background

To force backgrounds to be printed (can be useful when you "print" a pdf), add this CSS (compatible with Safari and Chrome):

```css
-webkit-print-color-adjust: exact;
        print-color-adjust: exact;
```

## Dev

 - `npm i` to install the dependencies
 - `npm run watch` to "watch" the scss folder and compile to css
 - `npm run build` to compile gutenberg to css
