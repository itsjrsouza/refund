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
By developing this project, I was able to improve my knowledge and skills in the technologies used, with an emphasis on React (components, props, state, hooks) and integration with a REST API. It was later extended to apply more advanced React patterns: Context API, custom hooks and render memoization.

## Features 💻
- Responsive layout: adapted to various screen sizes.
- Reusable `ExpenseCard` component, receiving the expense data via props.
- Controlled form to add new expenses.
- Mark an expense as **refunded** or **pending** (`status-toggle` button on each card).
- Remove an expense from the list — the remove control is a proper `<button>` with an accessible name, so it also works from the keyboard, not only by mouse click.
- Filter expenses by **all / pending / refunded**.
- Initial expense list loaded through `useEffect`, showing a "Carregando..." message while the request is in flight, while a locally cached copy renders instantly.
- Expenses persisted through a REST API ([crudcrud.com](https://crudcrud.com)); the current list is also mirrored to `localStorage` as an offline-friendly cache.

## Advanced React concepts applied
- **Context API** (`src/context/ExpensesContext.jsx`): centralizes the expenses list, loading/error state and the active filter, so any component in the tree can read or update it without prop drilling.
- **Custom hooks**: `useLocalStorage` (`src/hooks/useLocalStorage.js`) encapsulates reading/writing a JSON value to `localStorage`; `useExpenses` (`src/hooks/useExpenses.js`) wraps `useContext` for a clean, guarded way to consume the expenses context.
- **Memoization**: `ExpenseCard`, `ExpenseList` and `ExpenseFilters` are wrapped in `React.memo`, and the context's action functions (`addExpense`, `removeExpense`, `toggleExpenseStatus`) are defined with `useCallback` so their identity stays stable — avoiding unnecessary re-renders of the list when unrelated state changes. `useMemo` is used to derive the filtered list and the total amount only when the expenses or the filter actually change.

## Project structure
```
src/
  assets/       icons and images
  components/   ExpenseCard, ExpenseForm, ExpenseList, ExpenseFilters
  context/      ExpensesContext (global state via Context API)
  hooks/        useLocalStorage, useExpenses (custom hooks)
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
