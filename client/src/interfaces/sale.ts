export interface Sale {
  clientCi: number | null
  datetime: string
  id: number
  productId: number
  reserved: boolean
  amount: number
}