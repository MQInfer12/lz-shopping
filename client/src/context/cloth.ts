import { create } from "zustand";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";

interface State {
  selected: Product
  open: boolean
  search: string
  focused: boolean
  categoriesSelected: Category[]
}

type Action = {
  selectCloth: (cloth: Product) => void
  removeCloth: () => void
  changeOpen: () => void
  changeSearch: (e: React.FormEvent<HTMLInputElement>) => void
  handleFocus: () => void
  handleBlur: () => void
  selectCategory: (category: Category) => void
  handleCloseSearch: () => void
}

export const useCloth = create<State & Action>((set) => ({
  selected: {},
  open: false,
  search: '',
  focused: false,
  categoriesSelected: [],
  changeOpen: () => set(state => ({...state, open: !state.open })),
  selectCloth: (cloth) => set(state => ({...state, selected: cloth, open: true })),
  removeCloth: () => set(state => ({...state, selected: {}, open: !(window.innerWidth < 1110)})),
  changeSearch: (e) => set(state => ({...state, search: e.currentTarget.value })),
  handleFocus: () => set(state => ({...state, focused: true})),
  handleBlur: () => set(state => ({...state, focused: false})),
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
    var tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
    set(state => ({
      ...state,
      search: ""
    }));
  }
}));