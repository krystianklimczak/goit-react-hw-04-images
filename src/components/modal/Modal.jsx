import React, { useEffect } from 'react';

import { useImages } from 'hooks/ImagesContext';

import css from './Modal.module.css';

export default function Modal() {
  const { modalImageURL, handleEscapeKey } = useImages();

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  });

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={modalImageURL} alt="Take a look" />
      </div>
    </div>
  );
}
