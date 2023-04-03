import { create } from "zustand";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";

interface State {
  selected: Product | null
  open: boolean
  search: string
  sizeSearch: string
  focused: boolean
  categoriesSelected: Category[]
}

type Action = {
  selectCloth: (cloth: Product) => void
  removeCloth: () => void
  changeOpen: () => void
  changeSearch: (e: React.FormEvent<HTMLInputElement>) => void
  changeSizeSearch: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleFocus: () => void
  emptyCategories: () => void
  selectCategory: (category: Category) => void
  handleCloseSearch: () => void
}

export const useCloth = create<State & Action>((set) => ({
  selected: null,
  open: false,
  search: '',
  sizeSearch: '',
  focused: false,
  categoriesSelected: [],
  changeOpen: () => set(state => ({...state, open: !state.open })),
  selectCloth: (cloth) => set(state => ({...state, selected: cloth, open: true })),
  removeCloth: () => set(state => ({...state, selected: null, open: !(window.innerWidth < 1110)})),
  changeSearch: (e) => set(state => ({...state, search: e.currentTarget.value })),
  changeSizeSearch: (e) => set(state => ({...state, sizeSearch: e.target.value })),
  handleFocus: () => set(state => ({...state, focused: true})),
  emptyCategories: () => set(state => ({
    ...state,
    categoriesSelected: []
  })),
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
  }),
  handleCloseSearch: () => {
    set(state => ({
      ...state,
      search: "",
      focused: false,
      sizeSearch: ""
    }));
  }
}));