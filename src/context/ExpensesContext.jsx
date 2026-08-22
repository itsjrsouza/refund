import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../services/api.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const STORAGE_KEY = '@refund:expenses'

export const ExpensesContext = createContext(null)

export function ExpensesProvider({ children }) {
  const [cachedExpenses, setCachedExpenses] = useLocalStorage(STORAGE_KEY, [])
  const [expenses, setExpenses] = useState(cachedExpenses)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  // Carrega as despesas mais recentes da API assim que a página abre.
  // Enquanto isso, o que já estava salvo no localStorage é exibido na hora.
  useEffect(() => {
    async function loadExpenses() {
      try {
        setLoading(true)
        const data = await getExpenses()
        setExpenses(data.map((expense) => ({ status: 'pending', ...expense })))
      } catch (err) {
        setError('Não foi possível carregar as despesas.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadExpenses()
  }, [])

  useEffect(() => {
    setCachedExpenses(expenses)
  }, [expenses, setCachedExpenses])

  const addExpense = useCallback(async (newExpense) => {
    try {
      setAdding(true)
      setError('')
      const created = await createExpense({ ...newExpense, status: 'pending' })
      setExpenses((current) => [...current, { status: 'pending', ...created }])
    } catch (err) {
      setError('Não foi possível salvar a despesa.')
      console.error(err)
    } finally {
      setAdding(false)
    }
  }, [])

  const removeExpense = useCallback(async (id) => {
    try {
      setError('')
      await deleteExpense(id)
      setExpenses((current) => current.filter((expense) => expense._id !== id))
    } catch (err) {
      setError('Não foi possível remover a despesa.')
      console.error(err)
    }
  }, [])

  // Alterna pendente/reembolsada otimisticamente e sincroniza com a API depois,
  // sem depender do estado externo, para manter a função sempre com a mesma referência.
  const toggleExpenseStatus = useCallback((id) => {
    setExpenses((current) => {
      const updated = current.map((expense) =>
        expense._id === id
          ? { ...expense, status: expense.status === 'refunded' ? 'pending' : 'refunded' }
          : expense,
      )

      const changed = updated.find((expense) => expense._id === id)
      if (changed) {
        // Envia o registro completo (menos o _id, que já vai na URL) para não
        // perder expense/category/amount no PUT do crudcrud.
        const { _id, ...payload } = changed
        updateExpense(id, payload).catch((err) => {
          console.error(err)
        })
      }

      return updated
    })
  }, [])

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [expenses],
  )

  const filteredExpenses = useMemo(() => {
    if (filter === 'pending') {
      return expenses.filter((expense) => expense.status !== 'refunded')
    }

    if (filter === 'refunded') {
      return expenses.filter((expense) => expense.status === 'refunded')
    }

    return expenses
  }, [expenses, filter])

  const value = useMemo(
    () => ({
      expenses: filteredExpenses,
      totalCount: expenses.length,
      total,
      loading,
      adding,
      error,
      filter,
      setFilter,
      addExpense,
      removeExpense,
      toggleExpenseStatus,
    }),
    [
      filteredExpenses,
      expenses.length,
      total,
      loading,
      adding,
      error,
      filter,
      addExpense,
      removeExpense,
      toggleExpenseStatus,
    ],
  )

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
