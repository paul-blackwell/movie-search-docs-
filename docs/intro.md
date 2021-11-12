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
Firstly, we strongly recommend using Visual Studio Code as your code editor for this project. 
This will make setting up ESlint a lot easier.

“ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, 
with the goal of making code more consistent and avoiding bugs.” – eslint.org



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


Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

## Generate a new site

Generate a new Docusaurus site using the **classic template**:

```shell
npm init docusaurus@latest my-website classic
```

## Start your site

Run the development server:

```shell
cd my-website

npx docusaurus start
```

Your site starts at `http://localhost:3000`.

Open `docs/intro.md` and edit some lines: the site **reloads automatically** and displays your changes.
