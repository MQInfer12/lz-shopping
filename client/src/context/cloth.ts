import { create } from "zustand";
import { Product } from "../interfaces/product";

interface State {
  selected: Product
}

type Action = {
  selectCloth: (cloth: Product) => void,
  removeCloth: () => void
}

export const useCloth = create<State & Action>((set) => ({
  selected: {},
  selectCloth: (cloth) => set(state => ({...state, selected: cloth})),
  removeCloth: () => set(state => ({...state, selected: {}}))
}));