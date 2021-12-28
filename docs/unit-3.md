---
sidebar_position: 6
---

# Unit-3 (setting up Redux)

## Accessing the Unit-3 tutorial 

Clone the **[unit-3](https://github.com/paul-blackwell/movie-search/tree/unit-3)**, branch to start this tutorial.

In this unit we will be covering global state management using Redux, specifically **[Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)**. However, before we start we need to understand what global state management is in React.

## The problem

As of now we have been using prop-drilling to pass data between components.
> Prop drilling refers to the passing of the data from the parent to all the nested children in the React Tree.

For example in the [Unit-1 answers](/docs/unit-1-answers) we pasted down the
`showMobileNav` state from the `<Layout />` component to the `<Header />` and `<Nav />` child components to show and hide the navbar on mobile screens.
This worked as the `showMobileNav` state was only being passed down to two components however, this wouldn't be scalable if needed to share data between a lot of components for the following reasons: 

- If we pass data via props from one child to another, then to another and so on... it makes it very hard for use to keep track of where this data is coming from.
- If we update the data in one component it will re-render all of our components, if we had a lot of components this could cause some performance issues.

## The solution

Wouldn't it be a good idea is we had some sort of global state that acted like a mini database, where we can access all of a data from one place anywhere in our application. Well luckily there is and we can do this using one of the following:


### The context API
> The React Context API is a way for a React app to effectively produce global variables that can be passed around. This is the alternative to "prop drilling" or moving props from grandparent to child to parent, and so on. Context is also touted as an easier, lighter approach to state management using Redux.

### Redux
> Redux is a predictable state container designed to help you write JavaScript apps that behave consistently across client, server, and native environments and are easy to test.

:::note

Why not use the context API over Redux?

To cut a long story sort context API is a lot easier to set up and has a lot less boilerplate code however,

Redux has@
- Consistent architectural patterns
- Debugging capabilities
- Middleware
- Addons and extensibility
- Cross-platform and cross-framework usage
- Depending on your app's setup, much better performance than working with just Context

:::


### Redux Tookit
> Recently Redux Team launched Redux Toolkit, an officially recommended and a SOPE library that stands for Simple, Opinionated, Powerful, and Effective state management library. It allows us to write more efficient code, speed up the development process, and automatically apply the best-recommended practices. 

It was mainly created to solve the THREE MAJOR ISSUES with Redux:

- Configuring a Redux store is too complicated
- Have to add a lot of packages to build a large scale application
- Redux requires too much boilerplate code which makes it cumbersome to write efficient and clean code.
