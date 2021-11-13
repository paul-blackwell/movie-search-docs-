---
sidebar_position: 1
---

# Getting started

## Installing node
If you haven’t already got Node you will need to download it as we will need it to 
download all of the project dependencies, see **[link](https://nodejs.org/en/)**.

## Accessing each lesson/unit

The project is split up into multiple lessons called **units**, if you just want to 
get a feel for the project clone the **[master](https://github.com/paul-blackwell/movie-search.git)**
branch, this is what the project looks like after you finish every unit. If you want to dive 
right in, clone the **[unit-1](https://github.com/paul-blackwell/movie-search/tree/unit-1)** branch. 
Each unit branch is accompanied by an answers branch (e.g. **unit-1**, **unit-1-answers**) so, 
if you get stuck you can always compare your work to the answers branch.

## Configuring ESlint
Firstly, we strongly recommend using [Visual Studio Code](https://code.visualstudio.com/) as your 
code editor for this project. This will make setting up [ESlint](https://eslint.org/) a lot easier.

> ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, 
with the goal of making code more consistent and avoiding bugs.– eslint.org

You will need to install the [ESlint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 
for VScode, add the following code to your **settings.json** in VScode:

```json
}
    "eslint.validate": [
      "javascript",
      "javascriptreact",
    ],
    "eslint.alwaysShowStatus": true,
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
    "workbench.startupEditor": "none"
}
```

## Start your first unit
After you have cloned unit-1, you will need to run the following commands to install 
all of your dependencies and run the project.

```shell
npm install
```

```shell
npm start
```
After running npm start will, you project will start on `http://localhost:3000`.


## Component structure

This project uses [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) by Brad Frost
for its component structure, atomic design is methodology 
for creating design systems. There are five distinct levels in atomic design:

-	Atoms
-	Molecules
-	Organisms
-	Templates
-	Pages

### atoms
> Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button.

For example the `ButtonPrimary` component:

![Button Primary component](/img/getting-started/atomic-design/atom.png)

### molecules
> Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. These molecules take on their own properties and serve as the backbone of our design systems.

For example the `InputWithLabel` component:

![Input with Label component](/img/getting-started/atomic-design/molecule.png)

### organisms
> Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

For example the `Search` component:

![Search component](/img/getting-started/atomic-design/organism.png)

### templates
> Templates consist mostly of groups of organisms stitched together to form pages.

For example the `Layout` component:

![Layout component](/img/getting-started/atomic-design/template.png)

### pages
> Pages are specific instances of templates.

For example the `Home`page:

![Home page](/img/getting-started/atomic-design/page.png)
