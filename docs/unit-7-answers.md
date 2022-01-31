---
sidebar_position: 14
---

# Unit-7 answers

## Accessing the Unit-7 answers

Clone the **[unit-7-answers](https://github.com/paul-blackwell/movie-search/tree/unit-7-answers)**, branch to get the answers to unit-7.


## Answer

### Task 1

The first thing we need to do is import the `<MovieSection />` into our `<Favorites />` page component.

``` js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './favorites.module.scss';
import ButtonBack from '../../atoms/button-back/button-back';
import SecondaryHeading from '../../atoms/typography/secondary-heading/secondary-heading';
import MovieSection from '../../organisms/movie-section/movie-section'; // Added

```

Now all we need to do is render all of our movies in our favorites store, remember we have already ran a check to see if we don't have any movies in our store so we don't need to worry about that. To do this all we need to do is use the `.map` method on our `favorites` array that will render a `MovieSection` component for each movie in the favorites. We will also need to add our new props to the component and a key based on the `imdbID`.

``` jsx

// If there are movies in the favorites store
return (
  <div className={styles.favorites}>
    {favorites.map((favorite) => (
      <MovieSection
        key={favorite.imdbID}
        movieObj={favorite}
        dropDown
        removeFromFavoritesBtn
        divider
      />
    ))}
  </div>
);

```

This is what our final component should look like.


``` jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './favorites.module.scss';
import ButtonBack from '../../atoms/button-back/button-back';
import SecondaryHeading from '../../atoms/typography/secondary-heading/secondary-heading';
import MovieSection from '../../organisms/movie-section/movie-section';

const Favorites = () => {
  // Get Favorites from store
  const favorites = useSelector((state) => state.favorites.value);

  // If there are no movies in the favorites store show error toast
  const dispatch = useDispatch();
  if (favorites.length < 1) {
    dispatch({
      type: 'SHOW_TOAST',
      payload: {
        display: true,
        message: 'You currently have to favorites saved',
        type: 'error',
      },
    });
  }

  // If there are no movies in the favorites store
  if (favorites.length < 1) {
    return (
      <div className={styles.favorites}>
        <ButtonBack to="/">
          Back
        </ButtonBack>
        <SecondaryHeading>You currently have no favorites saved</SecondaryHeading>
      </div>
    );
  }

  // If there are movies in the favorites store
  return (
    <div className={styles.favorites}>
      {favorites.map((favorite) => (
        <MovieSection
          key={favorite.imdbID}
          movieObj={favorite}
          dropDown
          removeFromFavoritesBtn
          divider
        />
      ))}
    </div>
  );
};

export default Favorites;

```
