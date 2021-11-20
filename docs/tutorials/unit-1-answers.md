---
sidebar_position: 2
---

# Unit-1 answers

## Accessing the Unit-1 answers

Clone the **[unit-1-answers](https://github.com/paul-blackwell/movie-search/tree/unit-1-anwsers)**, branch to get the answers to unit-1.

## Answer
Firstly, we need to define our state in the parent component `<Layout />` and pass it down to the child components. We need to do this because we need both the children to access the state. The `<Header />` will need to update the state and display a hamburger or cross icon depending on what the state is and the `<Nav />` will need the state to toggle a CSS class to be shown or be hidden. Lets call our initial state `showMobileNav` and our setState to be `setMobileNav`. As we don’t want to display our navigation unless the user clicks on the hamburger icon, we are going to set our initial state to `false`.

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './layout.module.scss';
import Header from '../../organisms/header/header';
import Search from '../../organisms/search/search';
import Nav from '../../organisms/nav/nav';

const Layout = ({ children }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className={styles.layout}>
      <Header
        className={styles.layout__header}
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />
      <Search className={styles.layout__search} />
      <Nav className={styles.layout__nav} showMobileNav={showMobileNav} />
      <main className={styles.layout__main}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
```
Next let’s add an `onClick` event to our hamburger icon found in the `<Header />` component. We first need to define our `handleClick` function, this runs `setShowMobileNav` to whatever the current state `showMobileNav` isn’t, acting as a toggle. So, if the hamburger is clicked and our current state is false it will turn it to true. Its important to note that we get access to `showMobileNav` and `setShowMobileNav` because they are passed into our `<Header />` component as **[props](https://reactjs.org/docs/components-and-props.html)**.

```jsx
const Header = ({ className, showMobileNav, setShowMobileNav }) => {
  const handleClick = () => setShowMobileNav(!showMobileNav);
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles['header__top-container']}>
        <Logo />
        <div className={styles['header__menu-icon-container']}>
          <FiMenu className={styles['header__menu-icon']} />
        </div>
      </div>
    </div>
  );
};
```

After that we need to add the `onclick` event to our hamburger icon. However, if we want to dynamically change the icon based on the state later, we don't want the `onclick` to be directly on the icon, but instead on the `header__menu-icon-container` div.

```jsx

const Header = ({ className, showMobileNav, setShowMobileNav }) => {
  const handleClick = () => setShowMobileNav(!showMobileNav);
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles['header__top-container']}>
        <Logo />
        <div onClick={handleClick} className={styles['header__menu-icon-container']}>
          <FiMenu className={styles['header__menu-icon']} />
        </div>
      </div>
    </div>
  );
};

```
Lastly, we want to add or remove the `.nav--show` class from the `<Nav />` component depending on what our showMobileNav state is. To do this we will use a **[ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)** to set our `<Nav />` className to `nav--show` if `showMobileNav` is true, if not true will set it to an empty string. This is what will show and hide our `<Nav />` component on mobile.

``` jsx
const Nav = ({ className, showMobileNav }) => (
  <nav className={`${styles.nav} ${className} ${showMobileNav ? styles['nav--show'] : ''}`}>
    <ul className={styles.nav__list}>
      <li className={styles.nav__item}>
        <a className={styles['nav__link--active']} href="#">
          <FiCompass className={styles.nav__icon} />
          Browse
        </a>
      </li>
      <li className={styles.nav__item}>
        <a className={styles.nav__link} href="#">
          <FiHeart className={styles.nav__icon} />
          Favorites
        </a>
      </li>
    </ul>
    <CallToAction />
  </nav>
);
```


## The extra challenge answer

When the navigation is open, we want to update the hamburger menu icon to show as a cross. First we are going to import `<FiX />` component from [react-icons](https://react-icons.github.io/react-icons/icons?name=fi), this will be our cross icon. Then we are going to use a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to render the `<FiX />` component (close icon) if `showMobileNav` is true. If `showMobileNav` is not true we will render the `<FiMenu />` component (hamburger icon) instead.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './header.module.scss';
import Logo from '../../molecules/logo/logo';

const Header = ({ className, showMobileNav, setShowMobileNav }) => {
  const handleClick = () => setShowMobileNav(!showMobileNav);
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles['header__top-container']}>
        <Logo />
        <div onClick={handleClick} className={styles['header__menu-icon-container']}>
          {showMobileNav
            ? <FiX className={styles['header__menu-icon']} />
            : <FiMenu className={styles['header__menu-icon']} />}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  showMobileNav: PropTypes.bool.isRequired,
  setShowMobileNav: PropTypes.func.isRequired,
};

Header.defaultProps = {
  className: '',
};

export default Header;
```
