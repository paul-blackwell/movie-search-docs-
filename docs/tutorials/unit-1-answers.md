---
sidebar_position: 2
---

# Unit-1 answers

## Accessing the Unit-1 answers

Clone the **[unit-1-answers](https://github.com/paul-blackwell/movie-search/tree/unit-1-anwsers)**, branch to get the answers to unit-1.

## Answer
Firstly, we need to define our state in the parent component `<Layout />` and pass it down to the child components. We need to do this because we need both the children to access the state. The `<Header />` will need to update the state and display a hamburger or cross icon depending on what the state is and the `<Nav />` will need the state to toggle between two CSS classes to be shown or hidden. Lets call our initial state `showMobileNav` and our setState to be `setMobileNav`. As we don’t want to display our navigation unless the user clicks on the hamburger icon, we are going to set our initial state to `false`.

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
Next let’s add an `onClick` event to our hamburger icon found in the `<Header />` component. However, if we want to dynamically change the icon based on the state later, we don't want the `onclick` to be directly on the icon, but instead on the `header__menu-icon-container` div. 

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
