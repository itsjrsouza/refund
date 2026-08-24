import { memo } from 'react'
import styled from 'styled-components'

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'pending', label: 'Pendentes' },
  { id: 'refunded', label: 'Reembolsadas' },
]

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const FilterButton = styled.button`
  flex: 1;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ $active }) => ($active ? '#1f8459' : '#cdd5d2')};
  background-color: ${({ $active }) => ($active ? '#1f8459' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#4d5c57')};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;

  &:hover {
    border-color: #1f8459;
    color: ${({ $active }) => ($active ? '#ffffff' : '#1f8459')};
  }

  &:focus-visible {
    outline: 2px solid #1f8459;
    outline-offset: 2px;
  }
`

function ExpenseFilters({ filter, onChange }) {
  return (
    <FilterGroup role="group" aria-label="Filtrar despesas">
      {FILTERS.map((option) => {
        const active = filter === option.id

        return (
          <FilterButton
            key={option.id}
            type="button"
            $active={active}
            aria-pressed={active}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </FilterButton>
        )
      })}
    </FilterGroup>
  )
}

export default memo(ExpenseFilters)
