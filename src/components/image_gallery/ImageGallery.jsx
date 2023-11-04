import { useImages } from 'hooks/ImagesContext';
import ImageGalleryItem from 'components/image_gallery_item/ImageGalleryItem';

import css from './ImageGallery.module.css';

export default function ImageGallery() {
  const { images, handleShowModal } = useImages();

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
