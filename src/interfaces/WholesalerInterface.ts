export interface Product {
  id: string,
  name: string,
  stock: number,
  price: number
}

export interface Wholesaler {
  name: string
  products: Product[]
}