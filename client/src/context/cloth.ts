import { create } from "zustand";
import { Product } from "../interfaces/product";

interface State {
  selected: Product,
  open: boolean
}

type Action = {
  selectCloth: (cloth: Product) => void
  removeCloth: () => void
  changeOpen: () => void
}

export const useCloth = create<State & Action>((set) => ({
  selected: {},
  open: false,
  changeOpen: () => set(state => ({...state, open: !state.open })),
  selectCloth: (cloth) => set(state => ({...state, selected: cloth, open: true })),
  removeCloth: () => set(state => ({...state, selected: {}, open: !(window.innerWidth < 1110)})),
}));