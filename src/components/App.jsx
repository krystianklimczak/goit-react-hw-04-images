// 'React.Component'
import React, { Component } from 'react';

// components
import Searchbar from './searchbar/Searchbar';
import Loader from './loader/Loader';
import Button from './button/Button';
import Modal from './modal/Modal';
import ImageGallery from './image_gallery/ImageGallery';

// libraries
import axios from 'axios';
import Notiflix from 'notiflix';

// css modules
import css from './App.module.css';

export default class App extends Component {
  state = {
    isLoading: false,
    isModalVisible: false,
    currentPage: 1,
    error: '',
    images: [],
    prevQuery: '',
    onLastPage: false,
  };

  handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const query = form.elements.query.value;

    this.setState({
      query: query,
    });

    switch (query) {
      case '':
        Notiflix.Notify.warning(`Please fill out this field`);
        break;
      case this.state.prevQuery:
        Notiflix.Notify.info(
          `You already search for the ${this.state.prevQuery}`
        );
        break;
      default:
        this.getInitialData();
        this.setState({
          prevQuery: query,
          currentPage: 1,
          images: [],
        });
    }
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleClick = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleShowModal = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }

    this.setState({
      isModalVisible: true,
      modalImageURL: event.target.dataset.source,
    });
  };

  handleEscapeKey = event => {
    if (event.key === 'Escape') {
      this.setState({
        isModalVisible: false,
      });
    }
  };

  getInitialData = async () => {
    const { query, currentPage } = this.state;
    const searchParams = new URLSearchParams({
      q: query,
      page: currentPage,
      key: '40298535-c3e5c72155b16daae721a7471',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    });

    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?${searchParams}`
      );
      const responseImages = await response.data.hits;
      this.setState(state => ({
        images: [...state.images, ...responseImages],
        onLastPage: responseImages.length < 12 ? true : false,
      }));
    } catch (error) {
      this.setState({ error: error.toString() });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const newState = this.state;

    if (newState.currentPage !== prevState.currentPage) {
      this.getInitialData();
    }
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    const { isLoading, isModalVisible, images, onLastPage, modalImageURL } =
      this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} onChange={this.handleChange} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            handleShowModal={this.handleShowModal}
          />
        )}
        {!onLastPage && !isLoading && images.length > 0 && (
          <Button onClick={this.handleClick} />
        )}
        {isLoading && <Loader />}
        {isModalVisible && (
          <Modal
            modalImageURL={modalImageURL}
            handleEscapeKey={this.handleEscapeKey}
          />
        )}
      </div>
    );
  }
}
