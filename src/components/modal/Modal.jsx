// 'React.Component'
import React, { Component } from 'react';

// css modules
import css from './Modal.module.css';

// proptypes
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.handleEscapeKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.handleEscapeKey);
  }

  render() {
    const { modalImageURL } = this.props;
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={modalImageURL} alt="Take a look" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalImageURL: PropTypes.string.isRequired,
};
