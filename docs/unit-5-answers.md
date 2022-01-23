---
sidebar_position: 11
---

# Unit-5 answers

## Accessing the Unit-5 answers

Clone the **[unit-5-answers](https://github.com/paul-blackwell/movie-search/tree/unit-5-answers)**, branch to get the answers to unit-5.

## Answer

### Task 1

The first thing we need to do is import our `useDispatch` and `useNavigate` into our `<HeroSection>` component. 

```js

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'; // Added
import { useNavigate } from 'react-router-dom'; // Added 
import { FiPlay } from 'react-icons/fi';
import styles from './hero-section.module.scss';
import getMovieScore from '../../../utils/getMovieScore';
import MovieScore from '../../atoms/movie-score/movie-score';
import PrimaryHeading from '../../atoms/typography/primary-heading/primary-heading';
import TertiaryHeading from '../../atoms/typography/tertiary-heading/tertiary-heading';
import ButtonPrimary from '../../atoms/button-primary/button-primary';
import HeroImage from '../../atoms/hero-image/hero-image';

```

Next we need to declare them in our component.

``` js

const dispatch = useDispatch();
const navigate = useNavigate();

```

Then we need to add a `handleClick` function to our component that dispatches our setCurrentlySelected reducer and then navigates to our movie page. After this all we need to do is add an `onClick` to the components outer `<div>` and pass our `handleClick` function into it.

``` jsx

const handleClick = () => {
  dispatch({ type: 'SET_CURRENTLY_SELECTED_MOVIE', payload: movieObj });
  navigate(`/movie/${imdbID}`);
};

return (
  <div onClick={handleClick} className={`${className} ${styles['hero-section']}`}>
    <div className={styles['hero-section__score-container']}>
      <MovieScore score={getMovieScore(Ratings)} />
    </div>
    <div className={styles['hero-section__image-container']}>
      <HeroImage
        src={Poster}
        alt={Title}
        innerShadow
      />
    </div>
    <div className={styles['hero-section__content']}>
      <PrimaryHeading className={styles['hero-section__title']}>{Title}</PrimaryHeading>
      <TertiaryHeading className={styles['hero-section__tertiary-title']}>{Genre}</TertiaryHeading>
      <ButtonPrimary className={styles['hero-section__button-primary']} icon={<FiPlay />}>
        Watch now
      </ButtonPrimary>
    </div>
  </div>
);

```

This is what the finished component should look like.

``` jsx

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiPlay } from 'react-icons/fi';
import styles from './hero-section.module.scss';
import getMovieScore from '../../../utils/getMovieScore';
import MovieScore from '../../atoms/movie-score/movie-score';
import PrimaryHeading from '../../atoms/typography/primary-heading/primary-heading';
import TertiaryHeading from '../../atoms/typography/tertiary-heading/tertiary-heading';
import ButtonPrimary from '../../atoms/button-primary/button-primary';
import HeroImage from '../../atoms/hero-image/hero-image';

const HeroSection = ({ movieObj, className }) => {
  const {
    Poster, Title, Genre, Ratings, imdbID,
  } = movieObj;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: 'SET_CURRENTLY_SELECTED_MOVIE', payload: movieObj });
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div onClick={handleClick} className={`${className} ${styles['hero-section']}`}>
      <div className={styles['hero-section__score-container']}>
        <MovieScore score={getMovieScore(Ratings)} />
      </div>
      <div className={styles['hero-section__image-container']}>
        <HeroImage
          src={Poster}
          alt={Title}
          innerShadow
        />
      </div>
      <div className={styles['hero-section__content']}>
        <PrimaryHeading className={styles['hero-section__title']}>{Title}</PrimaryHeading>
        <TertiaryHeading className={styles['hero-section__tertiary-title']}>{Genre}</TertiaryHeading>
        <ButtonPrimary className={styles['hero-section__button-primary']} icon={<FiPlay />}>
          Watch now
        </ButtonPrimary>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  movieObj: PropTypes.object.isRequired,
  className: PropTypes.string,
};

HeroSection.defaultProps = {
  className: '',
};

export default HeroSection;

```

### Task 2

First we will need to import `useSelector` and  `useDispatch` into our `<MovieSection>`. Note we will need to use the `useSelector` to check if our movie is already in our favorites store.

``` js

import React from 'react';
import PropTypes from 'prop-types';
import { FiPlay } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux'; // Added 
import styles from './movie-section.module.scss';
import getMovieScore from '../../../utils/getMovieScore';
import ButtonBack from '../../atoms/button-back/button-back';
import ButtonFavorites from '../../atoms/button-favorites/button-favorites';
import ButtonPrimary from '../../atoms/button-primary/button-primary';
import StandardImage from '../../atoms/standard-image/standard-image';
import MovieScore from '../../atoms/movie-score/movie-score';
import PrimaryHeading from '../../atoms/typography/primary-heading/primary-heading';
import Paragraph from '../../atoms/typography/paragraph/paragraph';

```


Next we will need to get the state from our favorites store (this will be an array) and add set it as a variable `favorites`. Then we will check our favorites array using the `.find` method to see if our favorites array already has our movie imdbID (movieIsInFavorites).

``` js

// Get global favorites state
const favorites = useSelector((state) => state.favorites.value);
const movieIsInFavorites = favorites.find((item) => item.imdbID === imdbID);

```

Next need to make our `handleAddToFavorites` function, this will check to see if `movieIsInFavorites` is not set to true and it will dispatch our addToFavorites reducer. 

``` js

// This will add the movie to the favorites global state
const dispatch = useDispatch();
const handleAddToFavorites = () => {
  if (!movieIsInFavorites) {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: movieObj });
  }
};

```

Lastly, all we need to do is pass our `handleAddToFavorites` function to the `<ButtonFavorites/>` component as it has an onClick prop. This will fire our `handleAddToFavorites` function when the `<ButtonFavorites/>` component is clicked. Note that we can also pass in an alreadySelected prop to the `<ButtonFavorites/>` component as a bool. If true will this prop disable the button, so we will set our movieIsInFavorites variable to it. This also means that after the user adds the movie to the favorites store the button will be disabled. Plus if the user navigates to the page and the movie is already in the favorites store the button will automatically be disabled.

``` jsx

return (
  <div className={styles['movie-section']}>
    <ButtonBack to="/">
      Back
    </ButtonBack>
    <div className={`${className} ${styles['movie-section__container']}`}>
      <div className={styles['movie-section__image-container']}>
        {!favorite && (
        <div className={styles['movie-section__button-favorites-container']}>
          <ButtonFavorites
            onClick={handleAddToFavorites} // Added
            alreadySelected={movieIsInFavorites} // Added
          />
        </div>
        )}
        <StandardImage src={Poster} alt={Title} />
      </div>
      <div className={styles['movie-section__content']}>
        <PrimaryHeading>{Title}</PrimaryHeading>
        <div className={styles['movie-section__genre-container']}>
          <Paragraph>{Genre}</Paragraph>
          <MovieScore className={styles['movie-section__score']} score={getMovieScore(Ratings)} />
        </div>
        <div className={styles['movie-section__para-container']}>
          <Paragraph>{Plot}</Paragraph>
        </div>
        <ButtonPrimary
          icon={<FiPlay className={styles['movie-section__button-icon']} />}
          onClick={() => console.log('Watch now was clicked')}
          fullWidthOnMobile
        >
          Watch now
        </ButtonPrimary>
      </div>
    </div>
  </div>
);

```

This is what the completed component should look like.


``` jsx 

import React from 'react';
import PropTypes from 'prop-types';
import { FiPlay } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import styles from './movie-section.module.scss';
import getMovieScore from '../../../utils/getMovieScore';
import ButtonBack from '../../atoms/button-back/button-back';
import ButtonFavorites from '../../atoms/button-favorites/button-favorites';
import ButtonPrimary from '../../atoms/button-primary/button-primary';
import StandardImage from '../../atoms/standard-image/standard-image';
import MovieScore from '../../atoms/movie-score/movie-score';
import PrimaryHeading from '../../atoms/typography/primary-heading/primary-heading';
import Paragraph from '../../atoms/typography/paragraph/paragraph';

const MovieSection = ({ className, movieObj, favorite }) => {
  const {
    Poster, Title, Genre, Plot, Ratings, imdbID,
  } = movieObj;

  // Get global favorites state
  const favorites = useSelector((state) => state.favorites.value);
  const movieIsInFavorites = favorites.find((item) => item.imdbID === imdbID);

  // This will add the movie to the favorites global state
  const dispatch = useDispatch();
  const handleAddToFavorites = () => {
    if (!movieIsInFavorites) {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: movieObj });
    }
  };


  return (
    <div className={styles['movie-section']}>
      <ButtonBack to="/">
        Back
      </ButtonBack>
      <div className={`${className} ${styles['movie-section__container']}`}>
        <div className={styles['movie-section__image-container']}>
          {!favorite && (
          <div className={styles['movie-section__button-favorites-container']}>
            <ButtonFavorites
              onClick={handleAddToFavorites}
              alreadySelected={movieIsInFavorites}
            />
          </div>
          )}
          <StandardImage src={Poster} alt={Title} />
        </div>
        <div className={styles['movie-section__content']}>
          <PrimaryHeading>{Title}</PrimaryHeading>
          <div className={styles['movie-section__genre-container']}>
            <Paragraph>{Genre}</Paragraph>
            <MovieScore className={styles['movie-section__score']} score={getMovieScore(Ratings)} />
          </div>
          <div className={styles['movie-section__para-container']}>
            <Paragraph>{Plot}</Paragraph>
          </div>
          <ButtonPrimary
            icon={<FiPlay className={styles['movie-section__button-icon']} />}
            onClick={() => console.log('Watch now was clicked')}
            fullWidthOnMobile
          >
            Watch now

          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

MovieSection.propTypes = {
  movieObj: PropTypes.object.isRequired,
  className: PropTypes.string,
  favorite: PropTypes.bool,
};

MovieSection.defaultProps = {
  className: '',
  favorite: false,
};

export default MovieSection;

```
