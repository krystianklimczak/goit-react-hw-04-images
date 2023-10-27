// 'React.Component'
import React, { Component } from 'react';

// css modules
import css from './ImageGalleryItem.module.css';

// proptypes
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    const { smallImage, alt, largeImage } = this.props;
    return (
      <li className={css.imageGalleryItem}>
        <img
          src={smallImage}
          alt={alt}
          data-source={largeImage}
          className={css['imageGalleryItem-image']}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
