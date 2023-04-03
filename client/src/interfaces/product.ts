import { Category } from "./category"
import { User } from "./user"

export interface Product {
  id?: number
  name?: string
  price?: number
  stock?: number
  photo?: string
  discount?: number
  categories?: Category[]
  size?: string
  clients?: User[]
}