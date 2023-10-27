// 'React.Component'
import React, { Component } from 'react';

// css modules
import css from './Button.module.css';

// proptypes
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div className={css.loadMore}>
        <button onClick={onClick} className={css.button}>
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
