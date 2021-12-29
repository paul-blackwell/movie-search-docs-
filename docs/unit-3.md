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






 The `reducer` object is passed into the `configureStore` function as an argument, in `reducer` the `favoritesReducer`. We will cove the `favoritesReducer` shortly
