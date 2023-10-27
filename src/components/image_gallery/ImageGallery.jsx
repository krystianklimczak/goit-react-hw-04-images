// 'React.Component'
import React, { Component } from 'react';

// components
import ImageGalleryItem from 'components/image_gallery_item/ImageGalleryItem';

// css modules
import css from './ImageGallery.module.css';

// proptypes
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  render() {
    const { images, handleShowModal } = this.props;
    return (
      <ul className={css.imageGallery} onClick={handleShowModal}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            smallImage={image.webformatURL}
            largeImage={image.largeImageURL}
            alt={image.tags}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
