import { create } from "zustand";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";
import { getProductsAndCategories } from "../services/product";

interface State {
  products: Product[];
  categories: Category[];
  loadingIndex: boolean;
}

interface Action {
  addCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
  fillProductsAndCategories: () => void;
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
}

export const useData = create<State & Action>((set) => ({
  products: [],
  categories: [],
  loadingIndex: true,
  fillProductsAndCategories: async () => {
    const data = await getProductsAndCategories();
    set((state) => ({
      ...state,
      products: data.products,
      categories: data.categories,
      loadingIndex: false,
    }));
  },
  addCategory: (category) => {
    set((state) => ({
      ...state,
      categories: [...state.categories, category],
    }));
  },
  removeCategory:(category)=>{
    set((state) => ({
      ...state,
      categories:state.categories.filter(v=>v.id!=category.id),
    }));
  },
  addProduct: (product) => {
    set((state) => ({
      ...state,
      products: [...state.products, product]
    }))
  },
  editProduct: (product) => {
    set((state) => ({
      ...state,
      products: state.products.map(v => v.id === product.id ? product : v)
    }))
  },
  removeProduct: (product) => {
    set((state) => ({
      ...state,
      products: state.products.filter(v => v.id != product.id)
    }))
  }
}));
