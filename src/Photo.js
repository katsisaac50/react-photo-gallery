import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const imgWithClick = { cursor: 'pointer' };

class Photo extends PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { onClick, index, image } = this.props;
    onClick(event, { image, index });
  }

  render() {
    const { image, onClick, margin } = this.props;
    const imgStyle = { display: 'block', float: 'left', margin: margin };
    const { key: foo, ...imgAttrs} =  image; // separate out the key we don't need on the img
    return (
      <img
        style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
        {...imgAttrs}
        onClick={onClick ? this.handleClick : null}
      />
    );
  }
}

export const imagePropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  key: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  srcSet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  sizes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
});

Photo.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  image: imagePropType,
};

export default Photo;
