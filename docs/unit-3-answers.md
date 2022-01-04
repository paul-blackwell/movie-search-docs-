---
sidebar_position: 7
---

# Unit-3 answers

## Accessing the Unit-3 answers

Clone the **[unit-3-answers](https://github.com/paul-blackwell/movie-search/tree/unit-3-answers)**, branch to get the answers to unit-3.

## Answer

### Adding removeFromFavorites to our actions

The first thing we need to do is add our `removeFromFavorites` to our actions in favoritesActions.js 

``` js

import { createAction } from '@reduxjs/toolkit';

export const addToFavorites = createAction('ADD_TO_FAVORITES');
export const removeFromFavorites = createAction('REMOVE_FROM_FAVORITES');

```

### Adding our removeFromFavorites to our favoritesReducer

Now we need to import `removeFromFavorites` action into our `favoritesReducer` and add it to the `builder` call back function. The `removeFromFavorites` reducer will get our movie ID `imdbID` from the `action.payload`. Then we will use the `.filter` method to return a new array `updatedFavorites` that is our current state without our movie with the `imdbID` in `action.payload`. Next we will assign our current state to now be equal to our updatedFavorites array. 

``` js

import { createReducer } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites } from '../actions/favoritesActions';

const initialState = {
  value: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToFavorites, (state, action) => {
      state.value.push(action.payload);
    })
    .addCase(removeFromFavorites, (state, action) => {
      const movieID = action.payload.imdbID;
      const updatedFavorites = state.value.filter((movie) => movie.imdbID !== movieID);
      state.value = updatedFavorites;
    });
});

export default favoritesReducer;


```

### Updating our handleClick in the Card component

Finally, we now need to update our `handleClick` in the `<Card />` component. We first need to check our store to see if our movie is already in the store. If it is, we will remove it using our `removeFromFavorites` reducer and then we will return. If the movie is not already in our store we will add it to the store using our `addToFavorites` reducer.

``` js

// Just for testing will be remove in the future (unit-3)
// Get global favorites state
const favorites = useSelector((state) => state.favorites.value);

// This will add the movie to the favorites global state when the card is clicked
const dispatch = useDispatch();
const handleClick = () => {
  // If movie is already in favorites remove it and return
  if (favorites.find((favorite) => favorite.imdbID === movie.imdbID)) {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: movie });
    return;
  }

  // If movie is not already in favorites add it
  dispatch({ type: 'ADD_TO_FAVORITES', payload: movie });
};


```

This is what our final component should look like.

``` jsx

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
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

  // This will add the movie to the favorites global state when the card is clicked
  const dispatch = useDispatch();
  const handleClick = () => {
    // If movie is already in favorites remove it and return
    if (favorites.find((favorite) => favorite.imdbID === movie.imdbID)) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: movie });
      return;
    }

    // If movie is not already in favorites add it
    dispatch({ type: 'ADD_TO_FAVORITES', payload: movie });
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
