import { useContext } from 'react'
import { ExpensesContext } from '../context/ExpensesContext.jsx'

export function useExpenses() {
  const context = useContext(ExpensesContext)

  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesProvider.')
  }

  return context
}
