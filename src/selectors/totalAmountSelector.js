import { selector } from 'recoil'
import { expensesAtom } from '../atoms/expensesAtom.js'

// Soma sempre o total de todas as despesas, independente do filtro ativo.
export const totalAmountSelector = selector({
  key: 'totalAmountSelector',
  get: ({ get }) => {
    const expenses = get(expensesAtom)
    return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  },
})
