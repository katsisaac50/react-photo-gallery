import React from 'react';
import PropTypes from 'prop-types';

import { imagePropType } from './Photo';
import { computeSizes } from './utils';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      containerWidth: 0,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);

    let that = this;
    // this is to fix non-ios browsers where a scrollbar isnt present before
    // images load, then becomes present, and doesn't trigger an update.
    // avoids calling setState in componentDidUpdate causing maximum depth exceeded error
    window.requestAnimationFrame(function() {
      if (that._gallery.clientWidth !== that.state.containerWidth) {
        that.setState({ containerWidth: Math.floor(that._gallery.clientWidth) });
      }
    });
  }
  componentDidMount() {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }
  handleResize(e) {
    if (this._gallery.clientWidth !== this.state.containerWidth) {
      this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    }
  }
  handleClick(event, { index }) {
    const { images, onClick } = this.props;
    onClick(event, {
      index,
      image: images[index],
      previous: images[index - 1] || null,
      next: images[index + 1] || null,
    });
  }

  render() {
    // subtract 1 pixel because the browser may round up a pixel
    const width = this.state.containerWidth - 1;
    const { images, columns, margin, onClick } = this.props;
    const thumbs = computeSizes({ width, columns, margin, images });
    return (
      <div className="react-photo-gallery--gallery">
        <div ref={c => (this._gallery = c)}>
          {thumbs.map((image, index) => {
            return (
              <div key={image.key || image.src}>
              {this.props.children({
                margin: margin,
                index: index,
                image: image,
                onClick: onClick ? this.handleClick : null
              })}
              </div>
            );
          })}
        </div>
        <div style={{ content: '', display: 'table', clear: 'both' }} />
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(imagePropType).isRequired,
  onClick: PropTypes.func,
  columns: PropTypes.number,
  margin: PropTypes.number,
  children: PropTypes.func,
};

Gallery.defaultProps = {
  columns: 3,
  margin: 2,
};

export default Gallery;
