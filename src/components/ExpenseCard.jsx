import { memo } from 'react'
import removeIcon from '../assets/remove.svg'

function formatAmount(value) {
  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function ExpenseCard({ id, icon, name, category, amount, status, onRemove, onToggleStatus }) {
  const refunded = status === 'refunded'

  return (
    <li className={`expense${refunded ? ' expense-refunded' : ''}`}>
      <img src={icon} alt={category} />

      <div className="expense-info">
        <strong>{name}</strong>
        <span>{category}</span>
      </div>

      <button
        type="button"
        className="status-toggle"
        aria-pressed={refunded}
        onClick={() => onToggleStatus(id)}
      >
        {refunded ? 'Reembolsada' : 'Pendente'}
      </button>

      <span className="expense-amount">
        <small>R$</small>
        {formatAmount(amount)}
      </span>

      <button
        type="button"
        className="remove-icon"
        aria-label={`Remover despesa ${name}`}
        onClick={() => onRemove(id)}
      >
        <img src={removeIcon} alt="" />
      </button>
    </li>
  )
}

export default memo(ExpenseCard)
