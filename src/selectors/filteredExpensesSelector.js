import { selector } from 'recoil'
import { expensesAtom } from '../atoms/expensesAtom.js'
import { filterAtom } from '../atoms/filterAtom.js'

export const filteredExpensesSelector = selector({
  key: 'filteredExpensesSelector',
  get: ({ get }) => {
    const expenses = get(expensesAtom)
    const filter = get(filterAtom)

    if (filter === 'pending') {
      return expenses.filter((expense) => expense.status !== 'refunded')
    }

    if (filter === 'refunded') {
      return expenses.filter((expense) => expense.status === 'refunded')
    }

    return expenses
  },
})
