---
sidebar_position: 10
---

# Unit-5 (Movie page)

## Accessing the Unit-5 tutorial 

Clone the **[unit-5](https://github.com/paul-blackwell/movie-search/tree/unit-5)**, branch to start this tutorial.

## Intro

In this unit we will been setting up the navigating to the movie page and our movie page itself. However, firstly lets take a look at the components that have been added/updated to the app they are as follows.

### ButtonFavorites 

`<ButtonFavorites />` (atom) this component will render our favorites button and our remove from favorites button if we set the `removeFavorite` prop to true. We will also be adding our `addToFavorites` and `removeFromFavorites` reducers to the we covered  in [unit-3](/docs/unit-3) to this component.

![ButtonFavorites component with and without removeFavorite prop](/img/unit-5/button-favorites-component.png)

### Movie Section 

We also now have the `<MovieSection />` component. We will use this component on the movie page and favorites page to display our movie data. Note this component contains props that will allow us to change some of the styling and what `<ButtonFavorites />` is displayed/does depending on what page we want to render it on.


![Movie section component](/img/unit-5/movie-section-component.png)


## Navigating to the movie page
