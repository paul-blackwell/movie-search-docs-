---
sidebar_position: 15
---

# Unit-8 (Search results page part 1)

## Accessing the Unit-8

Clone the **[unit-8](https://github.com/paul-blackwell/movie-search/tree/unit-8)**, branch to start this tutorial.


## Intro

In this unit we will be setting up the first parts of the Search results page. We will be doing some more work with our toasts and toast store and we will also be looking at forms in React.


## Setting up the search form

In this section we are going to be looking at setting up our inputs and selects in `<Search />` component found in `/organisms/search.jsx`

![Annotated movie section](/img/unit-8/annotated-home-page.png)

### Setting up inputs and selects in react

The first thing we need to focus on is the `<InputWithLabel />` component that is being rendered in our `<Search />` component. Most of the hard work as be done for us, i.e the styling but if you try to type anything into the search nothing happens. This is because we need our inputs to be linked up to some state and when the value of the input is changed we update our state.

To do this we first need to set up our state, we might as well set up our state for the `<SelectWithLabel />` component while we are at it as that will need its own state as well.

``` js

// This will handle our input state and change
const [inputValue, setInputValue] = useState('');
const handleInputChange = (e) => setInputValue(e.target.value);

// This will handle our select state and change
const [selectValue, setSelectValue] = useState('movie');
const handleSelectChange = (e) => setSelectValue(e.target.value);

```

Next all we need to do is add our state to both our `<InputWithLabel />` and `<SelectWithLabel />` components. So the `value` prop will be set to our current state and the `onChange` prop will be set to our set state.

``` jsx

<InputWithLabel
  className={styles.search__input}
  type="text"
  placeholder="Search by title"
  value={inputValue} // Added
  handleChange={handleInputChange} // Added
  >
  <FiSearch className={styles.search__icon} />
</InputWithLabel>
<SelectWithLabel
  className={styles.search__select}
  label="Type:"
  value={selectValue} // Added 
  onChange={handleSelectChange} // Added
  options={[
    { value: 'movie', name: 'Movie' },
    { value: 'series', name: 'Series' },
    { value: 'episode', name: 'Episode' },
  ]}
/>

```

You can test this by entering a search into the `<InputWithLabel />` component, the search itself is not yet working but the input should update. This you can also test the `<SelectWithLabel />` component to see if that updates as well.


## Setting up the searchReducer

As you may have guessed as it would be a good idea to abstract the search logic away from the `<Search />` component, the component will give use the input data but our reducer will handle the API request. 

The first thing we need to do is add our `searchActions.js` to our `actions`folder with the following code:

``` js

import { createAction } from '@reduxjs/toolkit';

export const setSearch = createAction('SET_SEARCH');


```

The only action we will need is our `setSearch` action. This is because we only need to set the search as the searchReducer will handle the rest (handling errors and making the APR request).

Next lets add our `searchReducer.js` to the `reduces` folder. We need to start by setting up our `initialState`. This will be made up of two parts the `currentSearch` which is an object that contains `isValidSearch` a boolean, `errorMessage` which is a string and the `query` which is also a string but this is the query that will be send to the API. The `currentSearch` object is basically everything we need to know about the users search. However, the second part `results` which is an array will contain all of the data we get back from our API, but it needs to be set as an empty array as we have not yet made the API request.

For now we are only going to handle if the search is valid or not in our builder and update the state if there is an error. In unit-9 we will go on to add our API request to our `searchReducer` if  `currentSearch` is valid.

``` js

import { createReducer } from '@reduxjs/toolkit';
import { setSearch } from '../actions/searchActions';

const initialState = {
  currentSearch: {
    isValidSearch: null,
    errorMessage: '',
    query: '',
  },
  results: [],
};

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSearch, (state, action) => {
      const { isValidSearch, errorMessage, query } = action.payload.currentSearch;

      // If not a valid search don't make API request but just return updated state
      if (!isValidSearch) {
        state.currentSearch = {
          isValidSearch,
          errorMessage,
          query: '',
        };
        state.results = [];
      }
    });
});

export default searchReducer;

```

Lastly we need to add our new `searchReducer` to `store.js`.

``` js

import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './reducers/favoritesReducer';
import moviesReducer from './reducers/moviesReducer';
import toastReducer from './reducers/toastReducer';
import searchReducer from './reducers/searchReducer'; // Added

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
    toast: toastReducer,
    search: searchReducer, // Added
  },
});

```
