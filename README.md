<h1 align="center">Refund</h1>

<p align="center">
FullStack training programme promoted by Rocketseat!</p>

<p align="center">
  <img alt="projeto lading page" src=".github/cover.jpg" width="100%">
</p>

## Overview ⭐

Refund is a web application for requesting reimbursement and listing expenses.

## Technologies used
- React
- Vite
- JavaScript
- Git e Github
- Figma

## About the development
By developing this project, I was able to improve my knowledge and skills in the technologies used, with an emphasis on React (components, props, state, hooks) and integration with a REST API.

## Features 💻
- Responsive layout: adapted to various screen sizes.
- Reusable `ExpenseCard` component, receiving the expense data via props.
- Expense list rendered dynamically from state with `.map()`.
- Controlled form to add new expenses.
- Initial expense list loaded through `useEffect`, showing a "Carregando..." message while the request is in flight.
- Expenses persisted through a REST API ([crudcrud.com](https://crudcrud.com)).

## Project structure
```
src/
  assets/       icons and images
  components/   ExpenseCard, ExpenseForm
  data/         expense categories
  pages/        Home
  services/     API integration (crudcrud)
  App.jsx
  main.jsx
```

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment file and set your own [crudcrud.com](https://crudcrud.com) endpoint (the key expires after a few days, so generate your own):
   ```bash
   cp .env.example .env
   ```
3. Run the project in development mode:
   ```bash
   npm run dev
   ```
