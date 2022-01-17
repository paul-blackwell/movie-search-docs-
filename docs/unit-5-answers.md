---
sidebar_position: 11
---

# Unit-5 answers

## Accessing the Unit-5 answers

Clone the **[unit-5-answers](https://github.com/paul-blackwell/movie-search/tree/unit-4-answers)**, branch to get the answers to unit-5.

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


Next we will need to get the state from our favorites store and add set it as a variable `favorites`.  Then we declare another variable called movieIsInFavorites.
