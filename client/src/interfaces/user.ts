import { Product } from './product';

export interface User {
  ci: number,
  phone?: number,
  name?: string,
  products: Product[]
}