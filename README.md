in:
```css
@colors palette {
    foo: black;
    bar: white;
}
@colors {
    link-color: bar;
}
.baz {
    background-color: foo;
    color: link-color;
}
```
out:
```css
.baz {
    background-color: black;
    color: white;
}
```
