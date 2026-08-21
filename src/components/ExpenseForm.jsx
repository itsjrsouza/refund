import { useState } from 'react'
import { categories } from '../data/categories.js'

const amountToDisplay = (digits) => {
  const value = Number(digits || '0') / 100
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const amountToNumber = (displayAmount) => {
  return Number(displayAmount.replace(/\./g, '').replace(',', '.'))
}

function ExpenseForm({ onAdd, adding }) {
  const [expense, setExpense] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')

  function handleAmountChange(event) {
    const digits = event.target.value.replace(/\D/g, '')
    setAmount(amountToDisplay(digits))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const category = categories.find((item) => item.id === categoryId)
    const amountValue = amountToNumber(amount)

    if (!expense.trim() || !category || !amountValue) {
      return
    }

    await onAdd({
      expense: expense.trim(),
      category_id: category.id,
      category_name: category.name,
      amount: amountValue,
    })

    setExpense('')
    setCategoryId('')
    setAmount('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Solicitação de reembolso</h1>
      <p>
        Informe os dados da despesa para solicitar reembolso. A despesa será
        analisada e reembolsada em até 30 dias.
      </p>

      <fieldset>
        <legend>Nome da despesa</legend>
        <input
          type="text"
          value={expense}
          onChange={(event) => setExpense(event.target.value)}
          required
        />
      </fieldset>

      <div className="inputs-row">
        <fieldset>
          <legend>Categoria</legend>
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            required
          >
            <option value="" disabled hidden>
              Selecione
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend>Valor da despesa</legend>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0,00"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </fieldset>
      </div>

      <button type="submit" disabled={adding}>
        {adding ? 'Adicionando...' : 'Adicionar despesa'}
      </button>
    </form>
  )
}

export default ExpenseForm
