import axios from 'axios';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

const { createContext, useContext, useState, useEffect } = require('react');

const ImagesContext = createContext();

export const useImages = () => useContext(ImagesContext);

export const ImagesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [onLastPage, setOnLastPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [prevQuery, setPrevQuery] = useState('');
  const [query, setQuery] = useState('');
  const [modalImageURL, setModalImageURL] = useState('');

  useEffect(() => {
    if (query !== '') {
      getInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (currentPage !== 1) {
      getInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [isLoading, currentPage]);

  const handleSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    const query = form.elements.query.value;

    switch (query) {
      case '':
        Notiflix.Notify.warning(`Please fill out this field`);
        break;
      case prevQuery:
        Notiflix.Notify.info(`You already search for the ${prevQuery}`);
        break;
      default:
        setPrevQuery(query);
        setCurrentPage(1);
        setImages([]);
        setQuery(query);
    }
  };

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleShowModal = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }

    setIsModalVisible(true);
    setModalImageURL(event.target.dataset.source);
  };

  const handleEscapeKey = event => {
    if (event.key === 'Escape') {
      setIsModalVisible(false);
    }
  };

  async function getInitialData() {
    const searchParams = new URLSearchParams({
      q: query,
      page: currentPage,
      key: '40298535-c3e5c72155b16daae721a7471',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    });

    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://pixabay.com/api/?${searchParams}`
      );
      const responseImages = await response.data.hits;

      if (responseImages.length === 0) {
        Notiflix.Notify.failure(
          `There isn't any images with that query: "${query}"`
        );
      }

      setImages([...images, ...responseImages]);

      const isOnLastPage = responseImages.length < 12;

      setOnLastPage(isOnLastPage);
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ImagesContext.Provider
      value={{
        isLoading,
        isModalVisible,
        onLastPage,
        currentPage,
        images,
        error,
        prevQuery,
        query,
        modalImageURL,
        handleSubmit,
        handleClick,
        handleShowModal,
        handleEscapeKey,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

ImagesContext.Provider.propTypes = {
  value: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    onLastPage: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ),
    error: PropTypes.string.isRequired,
    prevQuery: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    modalImageURL: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleShowModal: PropTypes.func.isRequired,
    handleEscapeKey: PropTypes.func.isRequired,
  }),
};
