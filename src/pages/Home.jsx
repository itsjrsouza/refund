import { useEffect, useState } from 'react'
import ExpenseCard from '../components/ExpenseCard.jsx'
import ExpenseForm from '../components/ExpenseForm.jsx'
import { categories } from '../data/categories.js'
import { createExpense, deleteExpense, getExpenses } from '../services/api.js'

function formatAmount(value) {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function iconForCategory(categoryId) {
  return categories.find((category) => category.id === categoryId)?.icon
}

function Home() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadExpenses() {
      try {
        setLoading(true)
        const data = await getExpenses()
        setExpenses(data)
      } catch (err) {
        setError('Não foi possível carregar as despesas.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadExpenses()
  }, [])

  async function handleAdd(newExpense) {
    try {
      setAdding(true)
      setError('')
      const created = await createExpense(newExpense)
      setExpenses((current) => [...current, created])
    } catch (err) {
      setError('Não foi possível salvar a despesa.')
      console.error(err)
    } finally {
      setAdding(false)
    }
  }

  async function handleRemove(id) {
    try {
      setError('')
      await deleteExpense(id)
      setExpenses((current) => current.filter((expense) => expense._id !== id))
    } catch (err) {
      setError('Não foi possível remover a despesa.')
      console.error(err)
    }
  }

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const totalFormatted = total
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace(/^R\$\s*/, '')

  return (
    <section>
      <ExpenseForm onAdd={handleAdd} adding={adding} />

      <aside>
        <header>
          <p>
            Minhas solicitações <i>&bull;</i>
            <span>
              {expenses.length} {expenses.length > 1 ? 'despesas' : 'despesa'}
            </span>
          </p>
          <h2>
            <small>R$</small>
            {totalFormatted}
          </h2>
        </header>

        <ul>
          {error && <li className="list-message">{error}</li>}

          {!error && loading && <li className="list-message">Carregando...</li>}

          {!error && !loading && expenses.length === 0 && (
            <li className="list-message">Nenhuma despesa cadastrada.</li>
          )}

          {!loading &&
            expenses.map((expense) => (
              <ExpenseCard
                key={expense._id}
                icon={iconForCategory(expense.category_id)}
                name={expense.expense}
                category={expense.category_name}
                amount={formatAmount(Number(expense.amount))}
                onRemove={() => handleRemove(expense._id)}
              />
            ))}
        </ul>
      </aside>
    </section>
  )
}

export default Home
