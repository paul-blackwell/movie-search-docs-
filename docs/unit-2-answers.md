---
sidebar_position: 5
---

# Unit-2 answers

## Accessing the Unit-2 answers

Clone the **[unit-2-answers](https://github.com/paul-blackwell/movie-search/tree/unit-2-anwsers)**, branch to get the answers to unit-2.

## Answer​

First things first, we will start by defining our `cardsToShow` function, this will return the number of cards we need to
show depending on the screen size.

``` js
  // This will give us the width of the viewport every time the window size changes
  const { width } = useWindowDimensions();

  // This will give us the number of cards we need to show depending on the screen size
  const cardsToShow = (arr) => {
    if (width > 1280) {
      return 4;
    }
    if (width > 1040) {
      return 3;
    }
    if (width > 768) {
      return 2;
    }
    return arr.length;
  };

```

Next we need to define our state, we have to make a copy of `movies.popular` and assign it to popular variable.
We need to do this as when we run the `slice` method as it will change the original array and we don't want 
this to happen on our movies.popular array. Next we define our `startIndex`, this is what we will use to 
find the index of the first card we want to show. Then we define the `endIndex`, this will be used to 
find the index of the last card we want to show however, we set the original state of `endIndex`
to `cardsToShow(movies.popular)`. For example, if the screen is greater than 1280px, `cardsToShow`
will return 4, so our endIndex will be set to 4. Lastly, we need to define our paginatedMovies and
its original state will be set to `popular.slice(startIndex, endIndex)`.


``` jsx

  // Set up the states we will need for our pagination
  let popular = [...movies.popular];
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(cardsToShow(movies.popular));
  const [paginatedMovies, setPaginatedMovies] = useState(popular.slice(startIndex, endIndex));
  
```
