# PostCSS Colors [![Build Status](https://travis-ci.org/plesiecki/postcss-colors.svg)](https://travis-ci.org/plesiecki/postcss-colors) [![npm version](https://badge.fury.io/js/postcss-colors.svg)](https://badge.fury.io/js/postcss-colors) [![Dependency Status](https://david-dm.org/plesiecki/postcss-colors.svg)](https://david-dm.org/plesiecki/postcss-colors) 

Make custom color palette with ease.

## Installation
```sh
npm i postcss-colors -D
```

## Usage

**in**
```css
@colors palette {
    foo: white;
    bar: #000;
}
@colors {
    link-color: bar;
}
.baz {
    background-color: foo;
    color: link-color;
}
```
**out**
```css
.baz {
    background-color: black;
    color: white;
}
```
