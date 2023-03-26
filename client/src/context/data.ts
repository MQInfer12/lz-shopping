import { create } from "zustand";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";
import { getProductsAndCategories } from "../services/product";

interface State {
  products: Product[]
  categories: Category[]
}

interface Action {
  fillProductsAndCategories: () => void
}

export const useData = create<State & Action>((set) => ({
  products: [],
  categories: [],
  fillProductsAndCategories: async () => {
    const data = await getProductsAndCategories();
    set(state => ({
      ...state,
      products: data.products,
      categories: data.categories
    }));
  }
}));