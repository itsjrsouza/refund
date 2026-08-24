import { useState } from 'react'
import styled, { css } from 'styled-components'
import chevronDown from '../assets/chevron-down.svg'
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

const Form = styled.form`
  background-color: #f9fbfa;
  border-radius: 1rem;
  padding: 2.5rem;
  max-width: 462px;

  display: flex;
  flex-direction: column;

  @media (min-width: 1100px) {
    max-height: 428px;
  }

  @media (max-width: 1100px) {
    min-width: 100%;
  }
`

const Title = styled.h1`
  font-size: 1.25rem;
`

const Description = styled.p`
  font-size: 0.87rem;
  color: #4d5c57;
  margin: 0.75rem 0 2.5rem;
`

const Field = styled.fieldset`
  border: none;
  display: flex;

  legend {
    text-transform: uppercase;
    font-size: 0.62rem;
    color: #4d5c57;
    margin-bottom: 0.5rem;
  }

  &:focus-within legend {
    color: #1f8459;
    font-weight: 700;
  }
`

const fieldControlStyles = css`
  flex: 1;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1px solid #cdd5d2;
  padding: 0 1rem;
  font-size: 0.87rem;
  color: #1f2523;
  background-color: transparent;
  outline: none;

  &::placeholder {
    color: #4d5c57;
  }

  &:focus {
    border: 1.5px solid #1f8459;
  }
`

const Input = styled.input`
  ${fieldControlStyles}
`

const Select = styled.select`
  ${fieldControlStyles}

  appearance: none;
  background-image: url(${chevronDown});
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 1.25rem auto;

  &:invalid {
    color: #4d5c57;
  }
`

const InputsRow = styled.div`
  display: flex;
  flex: 1;

  gap: 1rem;
  margin-top: 1rem;

  fieldset:first-child {
    flex: 1;
  }

  fieldset:last-child input {
    max-width: 154px;
  }

  @media (max-width: 620px) {
    flex-direction: column;

    fieldset:last-child input {
      max-width: none;
      min-width: 100%;
    }
  }
`

const SubmitButton = styled.button`
  height: 3rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.87rem;
  color: #ffffff;
  background-color: #1f8459;
  font-weight: 700;
  padding: 1rem 1.25rem;
  cursor: pointer;
  margin-top: 2rem;

  transition: background-color 0.2s;

  &:hover {
    background-color: #2cb178;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

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
    <Form onSubmit={handleSubmit}>
      <Title>Solicitação de reembolso</Title>
      <Description>
        Informe os dados da despesa para solicitar reembolso. A despesa será
        analisada e reembolsada em até 30 dias.
      </Description>

      <Field>
        <legend>Nome da despesa</legend>
        <Input
          type="text"
          value={expense}
          onChange={(event) => setExpense(event.target.value)}
          required
        />
      </Field>

      <InputsRow>
        <Field>
          <legend>Categoria</legend>
          <Select
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
          </Select>
        </Field>

        <Field>
          <legend>Valor da despesa</legend>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="0,00"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </Field>
      </InputsRow>

      <SubmitButton type="submit" disabled={adding}>
        {adding ? 'Adicionando...' : 'Adicionar despesa'}
      </SubmitButton>
    </Form>
  )
}

export default ExpenseForm
