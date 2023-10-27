// 'React.Component'
import React, { Component } from 'react';

// libraries
import { RotatingLines } from 'react-loader-spinner';

// css modules
import css from './Loader.module.css';

export default class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <RotatingLines
          strokeColor="#3f51b5"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }
}
