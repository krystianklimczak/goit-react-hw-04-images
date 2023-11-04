import Modal from './modal/Modal';
import Button from './button/Button';
import Loader from './loader/Loader';
import Searchbar from './searchbar/Searchbar';
import { useImages } from 'hooks/ImagesContext';
import ImageGallery from './image_gallery/ImageGallery';

import css from './App.module.css';

export default function App() {
  const { images, onLastPage, isLoading, isModalVisible } = useImages();

  return (
    <div className={css.app}>
      <Searchbar />
      {images.length > 0 && <ImageGallery />}
      {!onLastPage && !isLoading && images.length > 0 && <Button />}
      {isLoading && <Loader />}
      {isModalVisible && <Modal />}
    </div>
  );
}
