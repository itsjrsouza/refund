import { useCallback, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { expensesAtom } from '../atoms/expensesAtom.js'
import { createExpense, deleteExpense, getExpenses, updateExpense } from '../services/api.js'

export function useExpensesActions() {
  const setExpenses = useSetRecoilState(expensesAtom)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  // Carrega as despesas mais recentes da API assim que a página abre.
  // Enquanto isso, o que já estava salvo no localStorage (via effect do
  // expensesAtom) é exibido na hora.
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
  }, [setExpenses])

  const addExpense = useCallback(
    async (newExpense) => {
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
    },
    [setExpenses],
  )

  const removeExpense = useCallback(
    async (id) => {
      try {
        setError('')
        await deleteExpense(id)
        setExpenses((current) => current.filter((expense) => expense._id !== id))
      } catch (err) {
        setError('Não foi possível remover a despesa.')
        console.error(err)
      }
    },
    [setExpenses],
  )

  // Alterna pendente/reembolsada otimisticamente e sincroniza com a API depois.
  const toggleExpenseStatus = useCallback(
    (id) => {
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
    },
    [setExpenses],
  )

  return { loading, adding, error, addExpense, removeExpense, toggleExpenseStatus }
}
