import ExpenseFilters from '../components/ExpenseFilters.jsx'
import ExpenseForm from '../components/ExpenseForm.jsx'
import ExpenseList from '../components/ExpenseList.jsx'
import { categories } from '../data/categories.js'
import { useExpenses } from '../hooks/useExpenses.js'

function iconForCategory(categoryId) {
  return categories.find((category) => category.id === categoryId)?.icon
}

function Home() {
  const {
    expenses,
    totalCount,
    total,
    loading,
    adding,
    error,
    filter,
    setFilter,
    addExpense,
    removeExpense,
    toggleExpenseStatus,
  } = useExpenses()

  const totalFormatted = total
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace(/^R\$\s*/, '')

  return (
    <section>
      <ExpenseForm onAdd={addExpense} adding={adding} />

      <aside>
        <header>
          <p>
            Minhas solicitações <i>&bull;</i>
            <span>
              {totalCount} {totalCount === 1 ? 'despesa' : 'despesas'}
            </span>
          </p>
          <h2>
            <small>R$</small>
            {totalFormatted}
          </h2>
        </header>

        <ExpenseFilters filter={filter} onChange={setFilter} />

        <ul>
          {error && <li className="list-message">{error}</li>}

          {!error && loading && expenses.length === 0 && (
            <li className="list-message">Carregando...</li>
          )}

          {!error && !loading && expenses.length === 0 && (
            <li className="list-message">Nenhuma despesa encontrada.</li>
          )}

          {!error && expenses.length > 0 && (
            <ExpenseList
              expenses={expenses}
              iconForCategory={iconForCategory}
              onRemove={removeExpense}
              onToggleStatus={toggleExpenseStatus}
            />
          )}
        </ul>
      </aside>
    </section>
  )
}

export default Home
