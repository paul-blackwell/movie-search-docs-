---
sidebar_position: 3
---

# Unit-2 (an intro into useEffect)

## Accessing the Unit-2 tutorial 

Clone the **[unit-2](https://github.com/paul-blackwell/movie-search/tree/unit-2)**, branch to start this tutorial.

## useEffect

In this unit we will start looking at the `useEffect` hook in React, 
> The Effect Hook lets you perform side effects in function components.
> Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. 

Side effects are basically anything that affects something outside of the scope of the current function that’s being executed. 

## Lets use the useEffect hook

The `useEffect()` hook accepts 2 arguments:

``` js
useEffect(callback[, dependencies]);
```

- callback is the function containing the side-effect logic. callback is executed right after changes were being pushed to DOM.
- dependencies is an optional array of dependencies. useEffect() executes callback only if the dependencies have changed between renderings.

Lets start by just using the callback function in useEffect. This example will update the document title to 
"The checkbox is checked" or to "The checkbox is unchecked" every time the component is updated, remember when we update 
our state (`setChecked`) the component will update/re-render. When it does to that our callback function in our `useEffect`
 hook will update the document title.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    document.title = `The checkbox is ${checked ? 'checked' : 'unchecked'}`;
  });

  return (
    <div>
      <label>
        <input 
        type="checkbox" 
        checked={checked}
         onChange={() => {setChecked(!checked)}}
        />
        <span>Check the checkbox</span>
        </label>
    </div>
  );
}

```

Now lets say we wanted to only update the document title when our checkbox is updated, but now we have some other 
state in our component (`setCount`) that will update our component as well. So we now only want to update the document title
if `checked` is updated not when `count` is updated. We can do this by passing in `checked` into are array of dependencies, now 
when `checked` is updated the document title will now be changed to "The checkbox is checked" or "The checkbox is unchecked".

```js
  useEffect(() => {
    document.title = `The checkbox is ${checked ? 'checked' : 'unchecked'}`;
  },[checked]);
  
```

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `The checkbox is ${checked ? 'checked' : 'unchecked'}`;
  },[checked]);

  return (
    <div>
      <label>
        <input 
        type="checkbox" 
        checked={checked}
         onChange={() => {setChecked(!checked)}}
        />
        <span>Check the checkbox</span>
        </label>
       <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
    </div>
  );
}

```
