---
sidebar_position: 1
---

# Getting started

## Accessing each lesson/unit

The project is split up into multiple lessons called **units**, if you just want to 
get a feel for the project clone the **[master](https://github.com/paul-blackwell/movie-search.git)**
branch, this is what the project looks like after you finish every unit. If you want to dive 
right in, clone the **[unit-1](https://github.com/paul-blackwell/movie-search/tree/unit-1)** branch. 
Each unit branch is accompanied by an answers branch (e.g. **unit-1**, **unit-1-answers**) so, 
if you get stuck you can always compare your work to the answers branch.

## Configuring ESlint
Firstly, we strongly recommend using [Visual Studio Code](https://code.visualstudio.com/) as your 
code editor for this project. This will make setting up [ESlint](https://eslint.org/) a lot easier.

> ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, 
with the goal of making code more consistent and avoiding bugs.– eslint.org

You will need to install the [ESlint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 
for VScode, add the following code to your **settings.json** in VScode:

```json
}
    "eslint.validate": [
      "javascript",
      "javascriptreact",
    ],
    "eslint.alwaysShowStatus": true,
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
    "workbench.startupEditor": "none"
}
```

## Start your first unit
After you have cloned unit-1, you will need to run the following commands to install 
all of your dependencies and run the project.

:::info

If you haven’t already got Node you will need to download it as we will need it to 
download all of the project dependencies, see **[link](https://nodejs.org/en/)**.

:::


```shell
npm install
```

```shell
npm start
```
After running npm start will, you project will start on `http://localhost:3000`.


## Component structure

This project uses [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) by Brad Frost
for its component structure, atomic design is methodology 
for creating design systems. There are five distinct levels in atomic design:

-	Atoms
-	Molecules
-	Organisms
-	Templates
-	Pages

### atoms
> Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button.

For example the `ButtonPrimary` component:

![Button Primary component](/img/getting-started/atomic-design/atom.png)

### molecules
> Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. These molecules take on their own properties and serve as the backbone of our design systems.

For example the `InputWithLabel` component:

![Input with Label component](/img/getting-started/atomic-design/molecule.png)

### organisms
> Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

For example the `Search` component:

![Search component](/img/getting-started/atomic-design/organism.png)

### templates
> Templates consist mostly of groups of organisms stitched together to form pages.

For example the `Layout` component:

![Layout component](/img/getting-started/atomic-design/template.png)

### pages
> Pages are specific instances of templates.

For example the `Home` page:

![Home page](/img/getting-started/atomic-design/page.png)

## Styling 

For styling this project uses **[SCSS](https://sass-lang.com/)** **[modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)**, this allows us to directly import styles into each one of our react components and it localises the styles to that component. What this in essence means is that styles from one component cannot override the styles from another component. This is useful as if we decide to remove a style from a component it does not affect anything else in the app. As we are using SCSS we can take advantage of the **[BEM](https://en.bem.info/methodology/naming-convention/)** naming convention and that’s also why you may see class names such as `styles['nav__link--active']`.


:::caution

Writing BEM class names as `styles['nav__link--active']` in the JSX may be updated in future, as this is a slightly messy way of implementing BEM into JSX, especially when implementing template literals for example:

``` jsx
  `${styles.nav} ${showMobileNav ? styles['nav--show'] : styles['nav--hide']}`.
```

Compared to BEM without the use of SCSS modules

``` js
  `nav  ${showMobileNav ?'nav--show' : 'nav--hide'}`.
```

See **[David Barral’s](https://medium.com/trabe/using-bem-conventions-in-css-modules-leveraging-custom-webpack-loaders-fd985f72bcb2)** article on how he implemented BEM with CSS modules.

:::

The example below shows how SCSS modules are implanted, note that the styles are imported into the React component.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiCompass, FiHeart } from 'react-icons/fi';
import styles from './nav.module.scss';
import CallToAction from '../../molecules/call-to-action/call-to-action';

const Nav = ({ className, showMobileNav }) => (
  <nav className={`${styles.nav} ${className} ${showMobileNav ? styles['nav--show'] : styles['nav--hide']}`}>
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

This is what the SCSS file will look like:
```scss
@import "/src/styles/abstracts/mixins";
@import "../../../styles/base/animations";

.nav {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8.125rem);
  background-color: var(--white);
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;

  @include respond(md) {
    height: calc(100vh - 9.25rem);
  }

  @include respond(lg) {
    height: 100%;
    border-right: 0.125rem solid var(--blue-gray-100);
    transform: scaleY(100%);
    opacity: 1;
  }

  &--show {
    animation: slideDown 0.5s forwards;
  }

  &--hide {
    animation: slideUp 0.5s forwards;
  }

  // more code ...
}
```

Lastly this is an example of what one of the class names would look like in the browser:

```html
<nav class="nav_nav__1F-E2 layout_layout__nav__36CDp nav_nav--hide__h_DJf">
  <ul class="nav_nav__list__1xPem">...</ul>
  <div class="call-to-action_call-to-action__3T7qu">...</div>
</nav>
```
