import { create } from "zustand";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";
import { Sale } from "../interfaces/sale";
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
  handleReserve: (sale: Sale, productId: number) => void;
  handleCancelReserve: (sale: Sale, productId: number) => void;
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
      categories: state.categories.filter(v => v.id != category.id),
      products: state.products.map(product => {
        let flag = false;
        product.categories?.forEach(v => {
          if(v.id === category.id) {
            flag = true
          };
        })
        if(product.categories && flag) {
          return {...product, categories: product.categories.filter(v => v.id != category.id)}
        }
        return product;
      })
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
  },
  handleReserve: (sale, productId) => {
    set(state => ({
      ...state,
      products: state.products.map((product, i) => {
        const newProduct = {...product};
        if(newProduct.id === productId) {
          newProduct.clients?.push(sale);
        }
        return newProduct;
      })
    }))
  },
  handleCancelReserve: (sale, productId) => {
    set(state => ({
      ...state,
      products: state.products.map((product, i) => {
        const newProduct = {...product};
        if(newProduct.id === productId) {
          newProduct.clients = newProduct.clients?.filter(client => client.id != sale.id);
        }
        return newProduct;
      })
    }))
  }
}));
