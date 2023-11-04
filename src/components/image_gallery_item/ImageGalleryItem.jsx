import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem(props) {
  const { smallImage, largeImage, alt } = props;
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
