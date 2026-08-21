import removeIcon from '../assets/remove.svg'

function ExpenseCard({ icon, name, category, amount, onRemove }) {
  return (
    <li className="expense">
      <img src={icon} alt={category} />

      <div className="expense-info">
        <strong>{name}</strong>
        <span>{category}</span>
      </div>

      <span className="expense-amount">
        <small>R$</small>
        {amount}
      </span>

      <img
        src={removeIcon}
        alt="remove"
        className="remove-icon"
        onClick={onRemove}
      />
    </li>
  )
}

export default ExpenseCard
