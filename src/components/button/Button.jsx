import { useImages } from 'hooks/ImagesContext';

import css from './Button.module.css';

export default function Button() {
  const { handleClick } = useImages();

  return (
    <div className={css.loadMore}>
      <button onClick={handleClick} className={css.button}>
        Load more
      </button>
    </div>
  );
}
