---
sidebar_position: 16
---

# Unit-8-answers

## Accessing the Unit-8 answers

Clone the **[unit-8-answers](https://github.com/paul-blackwell/movie-search/tree/unit-8-answers)**, branch to get the answers to unit-8.


## Answer

### Task 1

The first thing we need to do is import our `<Card />` component and `defaultMovies` data into our `<SearchResults />` page component.

``` js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './search-results.module.scss';
import ButtonBack from '../../atoms/button-back/button-back';
import SecondaryHeading from '../../atoms/typography/secondary-heading/secondary-heading';
import Card from '../../molecules/card/card'; // Added

// Just for testing
import defaultMovies from '../../../data/default-movies'; // Added

```

Next all we need to do is render our `defaultMovies.popular` using the map array method if the currentSearch is valid. Remember we also have to to set the `basic` prop in the `<Card />` component to render the correct version of the movie card for the search results.

``` jsx

if (currentSearch.isValidSearch) {
  return (
    <div className={styles['search-results']}>
      <ButtonBack to="/">
        Back
      </ButtonBack>
      <SecondaryHeading className={styles['search-results__heading']}>
        This is what we found for
        <span className={styles['search-results__heading-span']}>&quot;Alien&quot;</span>
      </SecondaryHeading>
      <div className={styles['search-results__cards']}>
        {defaultMovies.popular.map((movie) => (
          <Card movie={movie} basic key={movie.imdbID} />
        ))}
      </div>
    </div>
  );
}

```

### Task 2

We need to start by getting our `search` string from the currentSearch store. We are already importing it into the component so all we need to do is use [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to get the `search` string from it.

``` js

// Get search store
const currentSearch = useSelector((state) => state.search.currentSearch);
const { search } = currentSearch; // Added

```

Now all we need to do is render it.

``` jsx

// Is a valid search
if (currentSearch.isValidSearch) {
  return (
    <div className={styles['search-results']}>
      <ButtonBack to="/">
        Back
      </ButtonBack>
      <SecondaryHeading className={styles['search-results__heading']}>
        This is what we found for
        <span className={styles['search-results__heading-span']}>
          &quot;
          {search}
          &quot;
        </span>
      </SecondaryHeading>
      <div className={styles['search-results__cards']}>
        {defaultMovies.popular.map((movie) => (
           <Card movie={movie} basic key={movie.imdbID} />
        ))}
      </div>
    </div>
  );
}

```

Our finished component should look something like this:

```jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './search-results.module.scss';
import ButtonBack from '../../atoms/button-back/button-back';
import SecondaryHeading from '../../atoms/typography/secondary-heading/secondary-heading';
import Card from '../../molecules/card/card';

// Just for testing
import defaultMovies from '../../../data/default-movies';

const SearchResults = () => {
  // Get search store
  const currentSearch = useSelector((state) => state.search.currentSearch);
  const { search } = currentSearch;

  // If not a valid search show error toast
  const dispatch = useDispatch();
  if (!currentSearch.isValidSearch) {
    dispatch({
      type: 'SHOW_TOAST',
      payload: {
        display: true,
        message: currentSearch.errorMessage,
        type: 'error',
      },
    });
  }

  // User has navigated to the page and there is no data in currentSearch some info toast
  if (currentSearch.isValidSearch === null) {
    dispatch({
      type: 'SHOW_TOAST',
      payload: {
        display: true,
        message: 'Search for movies using the form at the top of the page',
        type: 'default',
      },
    });
  }

  // User has navigated to the page and there is no data in currentSearch
  if (currentSearch.isValidSearch === null) {
    return (
      <div className={styles['search-results']}>
        <ButtonBack to="/">
          Back
        </ButtonBack>
        <SecondaryHeading>Start searching for movies</SecondaryHeading>
      </div>
    );
  }

  // User has navigated to the page and there is no data in currentSearch
  if (!currentSearch.isValidSearch) {
    return (
      <div className={styles['search-results']}>
        <ButtonBack to="/">
          Back
        </ButtonBack>
        <SecondaryHeading>Please enter a valid search</SecondaryHeading>
      </div>
    );
  }

  // Is a valid search
  if (currentSearch.isValidSearch) {
    return (
      <div className={styles['search-results']}>
        <ButtonBack to="/">
          Back
        </ButtonBack>
        <SecondaryHeading className={styles['search-results__heading']}>
          This is what we found for
          <span className={styles['search-results__heading-span']}>
            &quot;
            {search}
            &quot;
          </span>
        </SecondaryHeading>
        <div className={styles['search-results__cards']}>
          {defaultMovies.popular.map((movie) => (
            <Card movie={movie} basic key={movie.imdbID} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ButtonBack to="/">
        Back
      </ButtonBack>
      <SecondaryHeading>We could not find anything</SecondaryHeading>
    </div>
  );
};

export default SearchResults;

```
