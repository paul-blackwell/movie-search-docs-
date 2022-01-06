---
sidebar_position: 8
---

# Unit-4 (setting up React Router)

## Accessing the Unit-4 tutorial 

Clone the **[unit-4](https://github.com/paul-blackwell/movie-search/tree/unit-4)**, branch to start this tutorial.

## React Router

In the section we will be covering React Router, specifically [React Router 6](https://reactrouter.com/). So what is React router anyway? 

> React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.

However, it is important to understand that we will be using React Router for client-side not server-side routing. What this means is that will are not actually loading a new page when we navigate to a new route (unlike server-side routing), It will look like we have but under the hood React Router will update our UI and URL but not actually load a new page. 

## Setting up BrowserRouter

Lets start by setting up our `BrowserRouter` in `index.jsx`.

> BrowserRouter: BrowserRouter is a router implementation that uses the HTML5 history API(pushState, replaceState and the popstate event) to keep your UI in sync with the URL.

```jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

```

## NoMatch page

Next lets quickly look at the `<NoMatch />` page component that was added to `src/components/pages`. All it shows is a `<PrimaryHeading />` and a `<Paragraph />` component. It is pretty basic but we will add to it in the future, we will leave it for now but it will come in handy later on in this unit, as we are going to use it as a 404 page if we can't find a route ie `/movie/this-page-dose-not-exist`.

``` jsx

import React from 'react';
import PrimaryHeading from '../../atoms/typography/primary-heading/primary-heading';
import Paragraph from '../../atoms/typography/paragraph/paragraph';

const NoMatch = () => (
  <div>
    <PrimaryHeading>Oops 404</PrimaryHeading>
    <Paragraph>Something went wrong.</Paragraph>
  </div>
);

export default NoMatch;

```

## Movie page

The `<Movie />` page component has also been added in `src/components/pages`, lets just add some place holder text in it for now. 

``` jsx

import React from 'react';

const Movie = () => (
  <div>
    I am a movie
  </div>
);

export default Movie;


```

## Adding our Routes

Lets say we wanted to add a `/movie` route to our URL, so when the user navigates to it it shows our `<Movie />` page component, how would we do that? Firstly, we will need to import `Routes` and `Route` from `'react-router-dom'` into our `App.js` file. We then add the `<Routes />` component our `<App />` component. However, we also want to add it inside our `<Layout />` component. Remember our `<Layout />` component contains our `<Header />` `<Navbar />` and `<Search />` components and we want these to be shown on every page. So, we don't want to render `<Layout />` component every time the URL is updated as it always says consistent. Now lets add our `<Route />` component with the path prop set to "movie" and the element prop set to `<Movie />`. What this means is if we hit `/movie` route our <Route />` will render our `<Movie />` component.

``` jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/main.scss';
import Layout from './components/templates/layout/layout';
import Movie from './components/pages/movie/movie';

const App = () => (
  <div className="App">
    <header className="App-header">
      <Layout>
        <Routes>
          <Route path="movie" element={<Movie />} />
        </Routes>
      </Layout>
    </header>
  </div>
);

export default App;

```

Whats wrong with the code above? 


