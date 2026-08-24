import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import ExpenseFilters from '../components/ExpenseFilters.jsx'
import ExpenseForm from '../components/ExpenseForm.jsx'
import ExpenseList from '../components/ExpenseList.jsx'
import { categories } from '../data/categories.js'
import { expensesAtom } from '../atoms/expensesAtom.js'
import { filterAtom } from '../atoms/filterAtom.js'
import { filteredExpensesSelector } from '../selectors/filteredExpensesSelector.js'
import { totalAmountSelector } from '../selectors/totalAmountSelector.js'
import { useExpensesActions } from '../hooks/useExpensesActions.js'

function iconForCategory(categoryId) {
  return categories.find((category) => category.id === categoryId)?.icon
}

const Section = styled.section`
  display: flex;
  flex: 1;
  gap: 1.25rem;
  padding-bottom: 2rem;

  @media (max-width: 1100px) {
    flex-direction: column;
    width: 100%;
    padding: 1.5rem;
  }
`

const AsideBox = styled.aside`
  background-color: #f9fbfa;
  border-radius: 1rem;
  padding: 2.5rem;
  max-width: 462px;
  min-width: 600px;

  @media (max-width: 1100px) {
    min-width: 100%;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid #e4ece9;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 620px) {
    flex-direction: column;
    align-items: center;
  }
`

const HeaderInfo = styled.p`
  color: #4d5c57;
  font-weight: 400;
  font-size: 1rem;

  span {
    font-size: 0.87rem;
  }
`

const Bullet = styled.i`
  color: #cdd5d2;
  margin: 0 0.5rem;
  font-style: normal;
`

const Total = styled.h2`
  font-size: 1rem;
  color: #1f2523;

  small {
    color: #4d5c57;
    font-weight: 400;
    font-size: 0.75rem;
    margin-right: 0.25rem;
  }
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  max-height: 310px;
  min-height: 310px;

  overflow-y: scroll;

  @media (max-width: 1100px) {
    width: 100%;
    height: auto;
    overflow: auto;
  }
`

const ListMessage = styled.li`
  margin: auto;
  color: #4d5c57;
  font-size: 0.87rem;
  text-align: center;
`

function Home() {
  const { loading, adding, error, addExpense, removeExpense, toggleExpenseStatus } =
    useExpensesActions()

  const allExpenses = useRecoilValue(expensesAtom)
  const expenses = useRecoilValue(filteredExpensesSelector)
  const total = useRecoilValue(totalAmountSelector)
  const [filter, setFilter] = useRecoilState(filterAtom)

  const totalFormatted = total
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace(/^R\$\s*/, '')

  return (
    <Section>
      <ExpenseForm onAdd={addExpense} adding={adding} />

      <AsideBox>
        <Header>
          <HeaderInfo>
            Minhas solicitações <Bullet>&bull;</Bullet>
            <span>
              {allExpenses.length} {allExpenses.length === 1 ? 'despesa' : 'despesas'}
            </span>
          </HeaderInfo>
          <Total>
            <small>R$</small>
            {totalFormatted}
          </Total>
        </Header>

        <ExpenseFilters filter={filter} onChange={setFilter} />

        <List>
          {error && <ListMessage>{error}</ListMessage>}

          {!error && loading && expenses.length === 0 && (
            <ListMessage>Carregando...</ListMessage>
          )}

          {!error && !loading && expenses.length === 0 && (
            <ListMessage>Nenhuma despesa encontrada.</ListMessage>
          )}

          {!error && expenses.length > 0 && (
            <ExpenseList
              expenses={expenses}
              iconForCategory={iconForCategory}
              onRemove={removeExpense}
              onToggleStatus={toggleExpenseStatus}
            />
          )}
        </List>
      </AsideBox>
    </Section>
  )
}

export default Home
