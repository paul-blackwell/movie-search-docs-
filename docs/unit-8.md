---
sidebar_position: 15
---

# Unit-8 (Search results page part 1)

## Accessing the Unit-8

Clone the **[unit-8](https://github.com/paul-blackwell/movie-search/tree/unit-8)**, branch to start this tutorial.


## Intro

In this unit we will be setting up the first parts of the Search results page. We will be doing some more work with our toasts and toast store and we will also be looking at forms in React.


## Setting up the search form

In this section we are going to be looking at setting up our inputs and selects in `<Search />` component found in `/organisms/search.jsx`

![Annotated movie section](/img/unit-8/annotated-home-page.png)

### Setting up inputs and selects in react

The first thing we need to focus on is the `<InputWithLabel />` component that is being rendered in our `<Search />` component. Most of the hard work as be done for us, i.e the styling but if you try to type anything into the search nothing happens. This is because we need our inputs to be linked up to some state and when the value of the input is changed we update our state.

To do this we first need to set up our state, we might as well set up our state for the `<SelectWithLabel />` component while we are at it as that will need its own state as well.

``` js

// This will handle our input state and change
const [inputValue, setInputValue] = useState('');
const handleInputChange = (e) => setInputValue(e.target.value);

// This will handle our select state and change
const [selectValue, setSelectValue] = useState('movie');
const handleSelectChange = (e) => setSelectValue(e.target.value);

```

Next all we need to do is add our state to both our `<InputWithLabel />` and `<SelectWithLabel />` components. So the `value` prop will be set to our current state and the `onChange` prop will be set to our set state.

``` jsx

<InputWithLabel
  className={styles.search__input}
  type="text"
  placeholder="Search by title"
  value={inputValue} // Added
  handleChange={handleInputChange} // Added
  >
  <FiSearch className={styles.search__icon} />
</InputWithLabel>
<SelectWithLabel
  className={styles.search__select}
  label="Type:"
  value={selectValue} // Added 
  onChange={handleSelectChange} // Added
  options={[
    { value: 'movie', name: 'Movie' },
    { value: 'series', name: 'Series' },
    { value: 'episode', name: 'Episode' },
  ]}
/>

```


