import { memo } from 'react'
import styled from 'styled-components'
import removeIcon from '../assets/remove.svg'

function formatAmount(value) {
  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Estilos do card (equivalente ao CardProduto: nome, preço/valor e botão de
// ação), migrados de CSS global para CSS-in-JS com styled-components.
const CardContainer = styled.li`
  display: flex;
  align-items: center;
  height: 38px;
`

const CategoryIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.75rem;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ProductName = styled.strong`
  font-size: 0.87rem;
  color: #1f2523;
  opacity: ${({ $refunded }) => ($refunded ? 0.6 : 1)};
`

const CategoryLabel = styled.span`
  font-size: 0.75rem;
  color: #4d5c57;
`

const Price = styled.span`
  font-size: 0.87rem;
  color: #1f2523;
  font-weight: 600;
  opacity: ${({ $refunded }) => ($refunded ? 0.6 : 1)};

  small {
    font-size: 0.75rem;
    color: #4d5c57;
    font-weight: 400;
    margin-right: 0.25rem;
  }
`

// Botão "Adicionar ao carrinho" do módulo, adaptado para o botão de status da
// despesa: muda de cor conforme a prop booleana `adicionado`
// (true → verde #198754, equivalente a "reembolsada"; false → cinza #6c757d,
// equivalente a "pendente").
const AddToCartButton = styled.button`
  border: none;
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 0.25rem 0.6rem;
  margin: 0 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s, filter 0.2s;
  background-color: ${({ $adicionado }) => ($adicionado ? '#198754' : '#6c757d')};

  &:hover {
    filter: brightness(1.1);
  }

  &:focus-visible {
    outline: 2px solid #1f8459;
    outline-offset: 2px;
  }
`

const RemoveButton = styled.button`
  height: 1.75rem;
  width: 1.75rem;
  margin-left: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 0.4rem;
  background-color: transparent;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.2s;

  img {
    height: 1rem;
    pointer-events: none;
  }

  &:hover {
    opacity: 0.7;
    background-color: #e4ece9;
  }

  &:focus-visible {
    outline: 2px solid #1f8459;
    outline-offset: 2px;
  }
`

function ExpenseCard({ id, icon, name, category, amount, status, onRemove, onToggleStatus }) {
  const refunded = status === 'refunded'

  return (
    <CardContainer>
      <CategoryIcon src={icon} alt={category} />

      <CardInfo>
        <ProductName $refunded={refunded}>{name}</ProductName>
        <CategoryLabel>{category}</CategoryLabel>
      </CardInfo>

      <AddToCartButton
        type="button"
        $adicionado={refunded}
        aria-pressed={refunded}
        onClick={() => onToggleStatus(id)}
      >
        {refunded ? 'Reembolsada' : 'Pendente'}
      </AddToCartButton>

      <Price $refunded={refunded}>
        <small>R$</small>
        {formatAmount(amount)}
      </Price>

      <RemoveButton
        type="button"
        aria-label={`Remover despesa ${name}`}
        onClick={() => onRemove(id)}
      >
        <img src={removeIcon} alt="" />
      </RemoveButton>
    </CardContainer>
  )
}

export default memo(ExpenseCard)
