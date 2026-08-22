import { memo } from 'react'
import ExpenseCard from './ExpenseCard.jsx'

function ExpenseList({ expenses, iconForCategory, onRemove, onToggleStatus }) {
  return (
    <>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense._id}
          id={expense._id}
          icon={iconForCategory(expense.category_id)}
          name={expense.expense}
          category={expense.category_name}
          amount={expense.amount}
          status={expense.status}
          onRemove={onRemove}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </>
  )
}

export default memo(ExpenseList)
