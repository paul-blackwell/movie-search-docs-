---
sidebar_position: 6
---

# Unit-3 (setting up Redux Toolkit)

## Accessing the Unit-3 tutorial 

Clone the **[unit-3](https://github.com/paul-blackwell/movie-search/tree/unit-3)**, branch to start this tutorial.

In this unit we will be covering global state management using Redux, specifically **[Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)**. However, before we start we need to understand what global state management is in React.

## The problem

As of now we have been using prop-drilling to pass data between components.
> Prop drilling refers to the passing of the data from the parent to all the nested children in the React Tree.

For example in the [Unit-1 answers](/docs/unit-1-answers) we pasted down the
`showMobileNav` state from the `<Layout />` component to the `<Header />` and `<Nav />` child components to show and hide the navbar on mobile screens.
This worked as the `showMobileNav` state was only being passed down to two components however, this wouldn't be scalable if needed to share data between a lot of components for the following reasons: 

- If we pass data via props from one child to another, then to another and so on... it makes it very hard for use to keep track of where this data is coming from.
- If we update the data in one component it will re-render all of our components, if we had a lot of components this could cause some performance issues.

## The solution

Wouldn't it be a good idea is we had some sort of global state that acted like a mini database, where we can access all of a data from one place anywhere in our application. Well luckily there is and we can do this using one of the following:


### The context API
> The React Context API is a way for a React app to effectively produce global variables that can be passed around. This is the alternative to "prop drilling" or moving props from grandparent to child to parent, and so on. Context is also touted as an easier, lighter approach to state management using Redux.

### Redux
> Redux is a predictable state container designed to help you write JavaScript apps that behave consistently across client, server, and native environments and are easy to test.

:::note

### Why not use the context API over Redux?

To cut a long story sort context API is a lot easier to set up and has a lot less boilerplate code however,

Redux has:
- Consistent architectural patterns
- Debugging capabilities
- Middleware
- Addons and extensibility
- Cross-platform and cross-framework usage
- Depending on your app's setup, much better performance than working with just Context

:::


### Redux Tookit
> Recently Redux Team launched Redux Toolkit, an officially recommended and a SOPE library that stands for Simple, Opinionated, Powerful, and Effective state management library. It allows us to write more efficient code, speed up the development process, and automatically apply the best-recommended practices. 

It was mainly created to solve the THREE MAJOR ISSUES with Redux:

- Configuring a Redux store is too complicated
- Have to add a lot of packages to build a large scale application
- Redux requires too much boilerplate code which makes it cumbersome to write efficient and clean code.


### What we are going to implement 

For this project we are going to use **[Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)** because we want to make use of all the advantages Redux has over the Context api but not have deal with the unnecessary boilerplate code that comes with Redux. Before we do that have a look at the diagram bellow showing the difference between prop-drilling and Redux Tool kit, just to 100% make sure you understand the difference.

![Prop-drilling vs Redux diagram](/img/unit-3/diagram.png)

## Setting up our global state

In this unit (**[unit-3](https://github.com/paul-blackwell/movie-search/tree/unit-3)**) we have everything we need already set up, however lets walk though
the code to see whats going on.

:::info

Redux DevTools extension

Redux Toolkit should automatically configure the Redux DevTools extension, however if you haven't already got it installed you will need to do so using the following link **[Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools)**. We will be using this extension later on in this unit.

:::

The following files have been added.

![Prop-drilling vs Redux diagram](/img/unit-3/unit-3-files.png)

### Creating the Redux store

First lets start with `store.js`, the following code has been added, This creates a Redux store, and also automatically configure the Redux DevTools extension so that we can inspect the store while developing. Lets pass an empty `reducer` object into our store, we will update this shortly but for now lets move onto the next step.

```jsx

/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

```

### Providing the Redux Store to React

Now our store has been created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application (in our index.js file). The Redux store that was created is then passed into the `<Provider>`. Then `<App>` is passed into the `<Provider>` as a child, this means that the `App` now has access to the store. So, every child component in our app can now have access to our sore.

``` jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

```

### Creating a Redux State Slice

Now in `reducers/favorites/favoritesSlice.js` lets set our favoritesSlice. First lets add our `initialState` witch is an object with the key `value` that is an empty array. Now lets make our `favoritesSlice`:

> createSlice(): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.

Our slice name is 'favorites', our initial state value is from the `initialState` object. Then we have to add our reducers, these reducers will allow us to update our state within the favoritesSlice. For now let just add one `addToFavorites`. This has two arguments `state` and `action`, `state` is our state and `action.payload` will alow use to update the state to what whatever the payload is. In this case we are pushing our `action.payload` to our state array.

Lastly we need to export our `addToFavorites` reducer and our favoritesSlice.reducer.

:::tip

### Don't get it?
Don't worry we will shortly be using React redux devtools to understand whats going on when we use our `addToFavorites` reducer. 

:::

```js
/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    addToFavorites: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addToFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
```

## Add Slice Reducers to the Store

Now we need to import the reducer function from the favorites and add it to our store. By defining a field inside the `reducer` parameter, we tell the store to use this slice reducer function to handle all updates to that state.

```js

/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './reducers/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

```

Lets check everything is working correctly buy inspecting our Redux state in the application. We can do this buy right clicking then selecting the "inspect" option. Assuming we have the **[Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools)** extension installed, 
all we need to do is click on two arrows in our devtools the click on Redux.

![Accessing Redux DevTools extension in google devtools screen shot](/img/unit-3/accessing-redux-devtools-extension.png)

Now we just click on the "State" tab and we should see our favorites state, it should look something like this:

``` js

favorites: { value: [] }

```

![Inspecting our state in Redux DevTools screenshot](/img/unit-3/inspecting-our-state-in-redux-devtools.png)

## Use Redux State and Actions in React Components

:::caution

In this section we will be adding an onclick to our `<Card />` component that adds a movie to the favorites store, however this will only be for testing the `useSelector` and `useDispatch` hooks and this will be removed in later units. This is because we are going to use **[React router](https://reactrouter.com/)** to navigate to a new route once the user clicks on the `<Card />` component in an upcoming tutorial.

:::


Lets say we want to access or update our favorites store in a component, all we have to do is import the `useSelector` and `useDispatch` hooks from 'react-redux' into our component. The `useSelector`hook will allow us to read data from the store and the `useDispatch` hook will allow us to  dispatch actions (update our favorites store).

Lets add an `onclick` to the `<Card />` component so when the user clicks on a Card the cards movie is added to our favorites store. 

![Annotated pagination cards screenshot showing the user where to add the onclick to](/img/unit-3/add-onclick-pagination-cards.png)

To do this we will first need to import our `useSelector` and `useDispatch` hooks and our `addToFavorites` reducer  into the `<Card />` component.

``` js

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'; // Add this line
import { addToFavorites } from '../../../reducers/favoritesSlice'; // Add this line
import styles from './card.module.scss';
import StandardImage from '../../atoms/standard-image/standard-image';
import MovieScore from '../../atoms/movie-score/movie-score';
import SecondaryHeading from '../../atoms/typography/secondary-heading/secondary-heading';
import Paragraph from '../../atoms/typography/paragraph/paragraph';
import truncate from '../../../utils/truncate';

```

Next we can get hold of our favorites store using the useSelector hook.

``` js

// Just for testing will be remove in the future (unit-3)
// Get global favorites state
const favorites = useSelector((state) => state.favorites.value);
console.log(favorites);

```

Now we can declare our `dispatch` function and add it to a `handleClick` function. When this `handleClick` function is fired our `addToFavorites` reducer with the card's movie can be passed into our `dispatch`. This will update our favorites store to now include our movie.

``` js

// This will add the movie to the favorites global state when the card is clicked
const dispatch = useDispatch();
const handleClick = () => {
  dispatch(addToFavorites(movie));
};

```

We now need to add an `onClick` to our `<Card />`, that will fire our `handleClick` function when the user clicks on the card.

``` jsx

return (
  <div onClick={handleClick} className={`${className} ${styles.card}`}>
    <div className={styles['card__image-container']}>
      <StandardImage src={Poster} alt={Title} />
    </div>
    <MovieScore score={getMovieScore()} />
    <SecondaryHeading>{truncate(Title, 20)}</SecondaryHeading>
    <Paragraph>{Genre}</Paragraph>
  </div>
);

```

Our `<Card />` component with all of the new code should look something like this.

``` jsx

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../../../reducers/favoritesSlice';
import styles from './card.module.scss';
import getMovieScore from '../../../utils/getMovieScore';
import StandardImage from '../../atoms/standard-image/standard-image';
import MovieScore from '../../atoms/movie-score/movie-score';
import SecondaryHeading from '../../atoms/typography/secondary-heading/secondary-heading';
import Paragraph from '../../atoms/typography/paragraph/paragraph';
import truncate from '../../../utils/truncate';

const Card = ({ className, movie }) => {
  const {
    Title, Poster, Genre, Ratings,
  } = movie;

  // Just for testing will be remove in the future (unit-3)
  // Get global favorites state
  const favorites = useSelector((state) => state.favorites.value);
  console.log(favorites);

  // This will add the movie to the favorites global state when the card is clicked
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addToFavorites(movie));
  };

  return (
    <div onClick={handleClick} className={`${className} ${styles.card}`}>
      <div className={styles['card__image-container']}>
        <StandardImage src={Poster} alt={Title} />
      </div>
      <MovieScore score={getMovieScore(Ratings)} />
      <SecondaryHeading>{truncate(Title, 20)}</SecondaryHeading>
      <Paragraph>{Genre}</Paragraph>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  movie: PropTypes.shape.isRequired,
};

Card.defaultProps = {
  className: '',
};

export default Card;


```

