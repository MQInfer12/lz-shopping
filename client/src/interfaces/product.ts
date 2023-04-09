import { Category } from "./category"
import { Sale } from "./sale"

export interface Product {
  id: number
  name?: string
  price?: number
  stock?: number
  photo?: string
  discount?: number
  categories?: Category[]
  size?: string
  clients?: Sale[]
}