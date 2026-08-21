const API_URL = import.meta.env.VITE_API_URL
const RESOURCE = 'despesas'

async function tratarResposta(response, mensagemErro) {
  if (!response.ok) {
    throw new Error(mensagemErro)
  }
  // O crudcrud responde 200 com corpo vazio em alguns casos (ex.: DELETE),
  // então só tentamos fazer o parse do JSON quando há conteúdo de fato.
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export async function getExpenses() {
  const response = await fetch(`${API_URL}/${RESOURCE}`)

  // O crudcrud retorna 404 até que a coleção seja criada pelo primeiro POST
  if (response.status === 404) {
    return []
  }

  return tratarResposta(response, 'Não foi possível carregar as despesas.')
}

export async function createExpense(expense) {
  const response = await fetch(`${API_URL}/${RESOURCE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  })

  return tratarResposta(response, 'Não foi possível cadastrar a despesa.')
}

export async function deleteExpense(id) {
  const response = await fetch(`${API_URL}/${RESOURCE}/${id}`, {
    method: 'DELETE',
  })

  return tratarResposta(response, 'Não foi possível remover a despesa.')
}
