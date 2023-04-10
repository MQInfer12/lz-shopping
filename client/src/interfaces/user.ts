import { Product } from './product';
import { Sale } from './sale';

export interface User {
  ci: number,
  phone?: number,
  name?: string,
  products: Sale[],
  bookings: Product[]
}