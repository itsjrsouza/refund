import { atom } from 'recoil'

const STORAGE_KEY = '@refund:expenses'

// Effect nativo do Recoil: hidrata o átomo a partir do localStorage assim que
// ele é lido pela primeira vez e mantém os dois sincronizados a cada mudança,
// substituindo o antigo hook useLocalStorage usado no Context API.
function syncWithLocalStorage({ setSelf, onSet }) {
  const savedValue = localStorage.getItem(STORAGE_KEY)

  if (savedValue != null) {
    try {
      setSelf(JSON.parse(savedValue))
    } catch (err) {
      console.error(err)
    }
  }

  onSet((newValue, _oldValue, isReset) => {
    if (isReset) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    }
  })
}

export const expensesAtom = atom({
  key: 'expensesAtom',
  default: [],
  effects: [syncWithLocalStorage],
})
