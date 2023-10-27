import React, { Component } from 'react';
import ImageGalleryItem from 'components/image_gallery_item/ImageGalleryItem';
import css from './ImageGallery.module.css';

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
