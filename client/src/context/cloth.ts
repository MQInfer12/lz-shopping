import { create } from "zustand";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";

interface State {
  selected: Product
  open: boolean
  categoriesSelected: Category[]
}

type Action = {
  selectCloth: (cloth: Product) => void
  removeCloth: () => void
  changeOpen: () => void
  selectCategory: (category: Category) => void
}

export const useCloth = create<State & Action>((set) => ({
  selected: {},
  open: false,
  categoriesSelected: [],
  changeOpen: () => set(state => ({...state, open: !state.open })),
  selectCloth: (cloth) => set(state => ({...state, selected: cloth, open: true })),
  removeCloth: () => set(state => ({...state, selected: {}, open: !(window.innerWidth < 1110)})),
  selectCategory: (categorie) => set(state => {
    if(state.categoriesSelected.includes(categorie)) {
      return {
        ...state, 
        categoriesSelected: state.categoriesSelected.filter(v => v != categorie)
      };
    }
    return {
      ...state, 
      categoriesSelected: [...state.categoriesSelected, categorie]
    };
  })
}));