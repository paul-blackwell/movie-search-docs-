---
sidebar_position: 9
---

# Unit-4 answers

## Accessing the Unit-4 answers

Clone the **[unit-4-answers](https://github.com/paul-blackwell/movie-search/tree/unit-4-answers)**, branch to get the answers to unit-4.

## Answer

### Making our page components

Firstly we need to make our `<SearchResults />` and `<Favorites>` page components. 

In `/components/pages/search-results/` add the following code to search-results.jsx:

``` jsx

import React from 'react';
import PrimaryHeading from '../../atoms/typography/primary-heading/primary-heading';

const SearchResults = () => (
  <PrimaryHeading>This is search results page</PrimaryHeading>
);

export default SearchResults;

```

Next in `/components/pages/favorites/` add the following code to favorites.jsx:

``` jsx 

import React from 'react';
import PrimaryHeading from '../../atoms/typography/primary-heading/primary-heading';

const Favorites = () => (
  <PrimaryHeading>This is favorites page</PrimaryHeading>
);

export default Favorites;

```

### Adding our new routes

Lastly, all we now need to do is add our routes for the page components we just made to app.js. We first need to import them into the app.js, then we just need to add two new `<Route />` components to our `<Routes>` component. Each `<Route />` component will render the page component and have it's corresponding path.

``` jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/main.scss';
import Layout from './components/templates/layout/layout';
import Home from './components/pages/home/home';
import Movie from './components/pages/movie/movie';
import SearchResults from './components/pages/search-results/search-results';
import Favorites from './components/pages/favorites/favorites';
import NoMatch from './components/pages/no-match/no-match';

const App = () => (
  <div className="App">
    <header className="App-header">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie" element={<Movie />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Layout>
    </header>
  </div>
);

export default App;

```
