---
sidebar_position: 13
---

# Unit-6 answers

## Accessing the Unit-6 answers

Clone the **[unit-6-answers](https://github.com/paul-blackwell/movie-search/tree/unit-6-answers)**, branch to get the answers to unit-6.


## Answer

### Task 1

The first thing we need to do is import our  `useSelector` and  `useDispatch` into our `<Toast />` component, we need to import `useSelector` as we will need to pass in our current toast store as an payload into our `useDispatch`.

``` js

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'; // Added
import {
  FiInfo, FiCheck, FiX, FiAlertOctagon,
} from 'react-icons/fi';
import styles from './toast.module.scss';

```
Now we just need to add our `dispatch` to our `handleClick` with the 'HIDE_TOAST' action and the current toast store as our payload. We need to do this as all we want to do change is the display state.

``` jsx

const toastStore = useSelector((state) => state.toast);
const dispatch = useDispatch();
const handleClick = () => {
  dispatch({ type: 'HIDE_TOAST', payload: toastStore.toast });
};

```

This is what our final component should look like.

``` jsx

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
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
  const toastStore = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: 'HIDE_TOAST', payload: toastStore.toast });
  };

  const showOrHideToast = () => {
    if (show) return `${styles['toast--show']}`;
    if (!hide && hide !== null) return `${styles['toast--hide']}`;

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


### Task 2

As always we will need to start by importing our `useSelector` and `useDispatch` into our  `<Layout />` component.

``` js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'; // Added
import styles from './layout.module.scss';
import Header from '../../organisms/header/header';
import Search from '../../organisms/search/search';
import Nav from '../../organisms/nav/nav';
import Toast from '../../molecules/toast/toast';

```

Next all we need to do is add another `useEffect` to our `<Layout />` component that checks if the `toastStore.toast.display` is `true` and after 2 seconds (using a `setTimeout`) then fires a dispatch with the 'HIDE_TOAST' action and the current toast store payload. However, we will need to clear the `setTimeout` in the `useEffect` otherwise this may lead to performance issues. 

``` js

// This will hide the toast after 2 seconds if its showing
const dispatch = useDispatch();
useEffect(() => {
  let timer;
  if (toastStore.toast.display) {
    timer = setTimeout(() => {
      dispatch({ type: 'HIDE_TOAST', payload: toastStore.toast });
    }, 2000);
  }
  return () => clearTimeout(timer);
}, [toastStore]);

```

This is what our completed layout component should look like.

``` jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styles from './layout.module.scss';
import Header from '../../organisms/header/header';
import Search from '../../organisms/search/search';
import Nav from '../../organisms/nav/nav';
import Toast from '../../molecules/toast/toast';

const Layout = ({ children }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [toastState, setToastState] = useState('');

  const toastStore = useSelector((state) => state.toast);
  useEffect(() => {
    setToastState(toastStore.toast);
  }, [toastStore]);

  // This will hide the toast after 2 seconds if its showing
  const dispatch = useDispatch();
  useEffect(() => {
    let timer;
    if (toastStore.toast.display) {
      timer = setTimeout(() => {
        dispatch({ type: 'HIDE_TOAST', payload: toastStore.toast });
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [toastStore]);

  return (
    <div className={styles.layout}>
      <Header
        className={styles.layout__header}
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />
      <Search className={styles.layout__search} />
      <Nav className={styles.layout__nav} showMobileNav={showMobileNav} />
      <main className={styles.layout__main}>
        <div className={styles.layout__wrapper}>
          {children}
        </div>
      </main>
      <Toast
        show={toastState.display}
        hide={toastState.display}
        message={toastState.message}
        error={toastState.type === 'error'}
        success={toastState.type === 'success'}
      />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

```
