<a href="http://neptunian.github.io/react-photo-gallery/"><img src="https://sandygonzales.com/rpg-logo2.png" width="350" /></a>

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/react-photo-gallery.svg)](https://badge.fury.io/js/react-photo-gallery)
[![Build Status](https://travis-ci.org/neptunian/react-photo-gallery.svg?branch=master)](https://travis-ci.org/neptunian/react-photo-gallery)
[![Coverage Status](https://coveralls.io/repos/github/neptunian/react-photo-gallery/badge.svg?branch=master)](https://coveralls.io/github/neptunian/react-photo-gallery?branch=master)
[![Dependency Status](https://david-dm.org/neptunian/react-photo-gallery.svg)](https://david-dm.org/neptunian/react-photo-gallery)

* Stateless, responsive, accessible, and highly customizable
* Maintains the original aspect ratio of your photos
* Uses actual image elements, optionally pass in srcSet and sizes attributes
* Supports passing in a custom image component for implementation of things like image selection, favorites, captions, or whatever your little heart desires!

## Preview
<img src="https://c1.staticflickr.com/5/4512/36861861853_4fcabda911_b.jpg" />

## Installation

To install:

```
yarn add react-photo-gallery
```

## Documentation and Examples

[http://neptunian.github.io/react-photo-gallery/](http://neptunian.github.io/react-photo-gallery/)

## Direct CodeSandbox Links with Examples and Use Cases

* [Basic](https://codesandbox.io/s/9yx911wl9y)
* [With Lightbox](https://codesandbox.io/s/5vn3lvz2n4)
* [Dynamic Columns](https://codesandbox.io/s/ll7ym48027)
* [Selection using custom ImageComponent](https://codesandbox.io/s/o7o241q09)
* [Sortable with drag and drop](https://codesandbox.io/s/8y7n1r9y5j)

To build some examples locally, run:

```
yarn install
yarn start

```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Use

```jsx

import Gallery, { Photo } from 'react-photo-gallery';

const PHOTO_SET = [
  {
    src: 'http://example.com/example/img1.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'http://example.com/example/img2.jpg',
    width: 1,
    height: 1
  }
];

export default class Sample extends React.Component {
  render() {
    return (
        <Gallery images={PHOTO_SET}>
          {props => (
            <Photo {...props} />
          )}
        </Gallery>
    );
  }
}

```
If the code pattern looks unfamiliar to you see [https://reactjs.org/docs/render-props.html](render props). 

### Gallery component properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
images | array  | undefined  | required; array of objects containing img attributes
columns | number  | 3  | optional; number of images per row
onClick | function  | undefined  | optional; do something when the user clicks an image; receives arguments event and an object containing the index, photo obj originally sent and the next and previous photos in the gallery if they exist
margin | number  | 2  | optional; number of pixels of margin around each image
children | function | none | optional; a function that returns a Photo component to render

### images object properties (array of objects passed into Gallery's images property)

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       required; the img src attribute value of the image
srcSet     |       array or string    |       undefined    |       optional
sizes     |       array or string    |       undefined    |       optional
width | number  | undefined  | required; original width of the gallery image (only used for calculating aspect ratio)
height  | number  | undefined | required; original height of the gallery image (only used for calculating aspect ratio)
alt  | string  | undefined | optional; alt text of the gallery image
key  | string or number  | src value | optional; use this for React key iterator otherwise defaults to the src value

### Photo / Custom component properties

If you use the Photo component provided, you can simply spread the props and move along. If you want to pass in your own image component, see the table below for what Gallery will send back. Most of the props being sent are the ones required below in the `images` array objects you passed into Gallery initially in addition to `margin`, `index`, and `onClick` but whos widths and heights have been adjusted by the algorithm. 

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
image  | object  | undefined | required; same object from images array passed to Gallery from user (see above)
margin  | number  | undefined | optional; passed through from user
onClick  | function  | passed from Gallery | optional; passed through from user
index  | number  | passed from Gallery | required; index from position in the Gallery

### Custom photo component

Pass in your own custom component to implement whatever you want. You should most likely still pass in all props, but it depends what you will need in your component. You can pass through more of your own props.

```
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage'

<Gallery images={this.state.photos} columns={this.props.columns} onClick={this.selectPhoto}>
  {props => (
    <SelectedImage {...props} userProp="test" userProp2="test2"/>
  )}    
</Gallery>
```
