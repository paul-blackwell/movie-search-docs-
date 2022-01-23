---
sidebar_position: 12
---

# Unit-6 (Toasts)

## Accessing the Unit-6 

Clone the **[unit-6](https://github.com/paul-blackwell/movie-search/tree/unit-6)**, branch to start this tutorial.

## Intro

Ib this unit we will be covering toasts, but what the hell is a toast?
>A toast... is a small message that shows up in a box at the bottom of the screen and disappears on its own after few seconds. It is a simple feedback about an operation in which current activity remains visible and interactive.

We will be using toasts in our app to inform the user an operation has been preformed, for example the user add a movie to their favorites a success toast will then been shown.


## The Toast component 

The `<Toast />`(molecule) component has been provided to us. Its prop types are as follows:
- `className` is a string and allows us to add custom styles
- `error` is a bool and allows us to change the Toast style and icon to  display as an error Toast
- `success` is a bool and allows us to change the Toast style and icon to  display as an susses Toast
- `message` is a string and allows use to display a message in the Toast e.g "Added Blade Runner to your favorites."
- `show` is bool and allows us to animate the Toast into the view port
- `hide` is bool and allows us to animate the Toast out of the view port

This is what the `error` and `success` props look like when added to the component.

![Toast showing the default, success and error props`](/img/unit-6/toasts.png)

And the code for the component looks like this. Note that the `handleClick` has a "TODO" comment next to it, don't worry about this for now we will be handling it in the task.

``` jsx

import React from 'react';
import PropTypes from 'prop-types';
import {
  FiInfo, FiCheck, FiX, FiAlertOctagon,
} from 'react-icons/fi';
import styles from './toast.module.scss';

const Toast = ({
  className,
  error,
  success,
  message,
  show,
  hide,
}) => {
  // TODO:
  const handleClick = () => {
    console.log('toast was closed');
  };

  const showOrHideToast = () => {
    if (show) return `${styles['toast--show']}`;
    if (hide) return `${styles['toast--hide']}`;

    return '';
  };

  if (error) {
    return (
      <div className={`${className} ${styles.toast} ${styles['toast--error']} ${showOrHideToast()}`}>
        <div className={styles.toast__container}>
          <FiAlertOctagon className={styles.toast__icon} />
          <p className={styles.toast__para}>{message}</p>
          <button
            type="button"
            className={styles.toast__button}
            onClick={handleClick}
          >
            <FiX className={styles.toast__icon} />
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={`${className} ${styles.toast} ${styles['toast--success']} ${showOrHideToast()}`}>
        <div className={styles.toast__container}>
          <FiCheck className={styles.toast__icon} />
          <p className={styles.toast__para}>{message}</p>
          <button
            type="button"
            className={styles.toast__button}
            onClick={handleClick}
          >
            <FiX className={styles.toast__icon} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} ${styles.toast} ${showOrHideToast()}`}>
      <div className={styles.toast__container}>
        <FiInfo className={styles.toast__icon} />
        <p className={styles.toast__para}>{message}</p>
        <button
          type="button"
          className={styles.toast__button}
          onClick={handleClick}
        >
          <FiX className={styles.toast__icon} />
        </button>
      </div>
    </div>
  );
};

Toast.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  show: PropTypes.bool,
  hide: PropTypes.bool,
  message: PropTypes.string,
};

Toast.defaultProps = {
  className: '',
  error: false,
  success: false,
  show: false,
  hide: false,
  message: 'Add a toast massage as a prop',
};

export default Toast;

```
