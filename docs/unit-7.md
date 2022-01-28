---
sidebar_position: 13
---

# Unit-7 (Favorites page)

## Accessing the Unit-7

Clone the **[unit-7](https://github.com/paul-blackwell/movie-search/tree/unit-7)**, branch to start this tutorial.


## Intro

In this unit we will we building the favorites page. 

![Favorites page screenshot](/img/unit-7/favorites-page.png)

## MovieSection component

Before we get started we need to take a look at the `<MovieSection />` component as some changes have been made to it to allow use to us it in the `<Favorites>` page component. The `<MovieSection />` component now contains the following props:

### Props

| Prop                  | Type    | Description                                                                 |
|-----------------------|---------|-----------------------------------------------------------------------------|
|className              | string  | This allows a custom styles to be added to the component                    |
|movieObj               | object  | Is the movie data object the component needs to display                     |
|dropDown               | bool    | If true will change the movie description paragraph into a dropdown         |
|removeFromFavoritesBtn | bool    | If true renders the favorite button  as the remove from favorites button    |
|divider                | bool    | If true renders the divider at the bottom of the component                  |

As we want the `<MovieSection>` component to render as shown in the image bellow, we will need to add the `dropDown`, `removeFromFavoritesBtn` and `divider` props.

![Annotated movie section](/img/unit-7/annotated-movie-section.png)

### Remove from favorites button

Currently the `handleRemoveFromFavorites` function in the `<MovieSection />` component is only console logging "I was removed from favorites". 

``` js

// TODO: Remove from favorites
const handleRemoveFromFavorites = () => {
  console.log('I was removed from favorites');
};

```

We need to update this by removing the `console.log` and adding a `dispatch` with the "REMOVE_FROM_FAVORITES" action. Remember we will still need to pass in the `movieObj` as a payload as our reducer will need to know what movie to remove from the store. We won't be able to test this yet because the remove from favorites button is only shown when the `<MovieSection />` component has the `removeFromFavoritesBtn` prop, this prop is not enabled when we render the  `<MovieSection />` component in the `<Movie />` page component. However, when we go to render our `<MovieSection />` component in the `<Favorites />` page component we will add the `removeFromFavoritesBtn` prop.

``` js

// This will remove a favorite for the favorites store
const handleRemoveFromFavorites = () => {
  dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: movieObj });
};

```

## Error toast

Before we render any `<MovieSection />` components we need the `<Favorites>` page component to inform the user that have have no saved favorites if we can't fine any movies saved to the 
