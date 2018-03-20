# Text Scroll

Zero-dependency module to scroll between predefined text. Leverages Element.animate for modern browsers, and falls back on simple class based animations for legacy browsers.

![Example](https://raw.githubusercontent.com/brandon-pereira/scroll-text/master/example.gif)

## Installation

This project is meant to be used with a dependency manager (Webpack, Browserify, etc). You should npm install it, then you can access it in your front end code.

```bash
npm install scroll-text --save
```

## Usage

To bind it to any element with a [data-scroll-text] attribute, use this code.

```javascript
import ScrollText from 'scroll-text';

const els = document.querySelectorAll('[data-scroll-text]');
Array.from(els).forEach(el => {
    new ScrollText(el);
});
```

To pass options:

```javascript
import ScrollText from 'scroll-text';
new ScrollText(document.querySelector('#element'), {
    speed: 500
});
```

## Methods

ScrollText has very minimal public methods:

- constructor `const instance = new ScrollText(el, options)`
  - `el` (HTMLElement) element to activate ScrollText on
  - `options` (Object) any additional options to add. Options include:
    - `speed` [Integer] Time to wait before changing text (in ms). Default: `2000`.
    - `textAttribute` [String] What attribute to look for. ie data-scroll-text="hello|world|i'm|brandon". Default: `data-scroll-text`.
    - `scrollAmount` [String] How many pixels to move the text when scrolling.  Default: `20px`.
    - `scrollSpeed` [Integer] How fast to scroll text (the animation duration). Default: `200`.
    - `delimiter` [String] What to break the string on. Default `|`.
    - `text` [Array] Array of strings that should be shown **instead** of lookng at the `textAttribute` property.

- destroy `instance.destroy()`.
  - This will destroy component and unbind all listeners. Useful if you need to use this on something that will later be removed (modals, pages, etc.)

- next `instance.next()`
  - Immediately switch to the next slide.

## Styling Considerations

The following is recommended for styling. These styles ensure the component renders correctly, and the opacity/transform/transition properties are used in browsers that don't support the native Element.animate methods.

```scss
[data-scroll-text] {
  display: inline;
  position: relative;
  span {
    transition: all .2s;
    position: absolute;
    left: 0;
    opacity: 0;
    transform: translateY(50px);
  }
  span.current {
    position: relative;
    transform: translateY(0);
    opacity: 1;
  }
}
```

## TODO

- Gif of it in use
- Publish it