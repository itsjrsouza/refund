import { memo } from 'react'

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'pending', label: 'Pendentes' },
  { id: 'refunded', label: 'Reembolsadas' },
]

function ExpenseFilters({ filter, onChange }) {
  return (
    <div className="expense-filters" role="group" aria-label="Filtrar despesas">
      {FILTERS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={filter === option.id ? 'active' : ''}
          aria-pressed={filter === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default memo(ExpenseFilters)
