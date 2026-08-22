import { atom } from 'recoil'

// Valores possíveis: 'all' | 'pending' | 'refunded'
export const filterAtom = atom({
  key: 'filterAtom',
  default: 'all',
})
