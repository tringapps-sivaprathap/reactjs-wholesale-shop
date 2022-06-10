export interface Product {
  name: string,
  stock: number
}

export type Retailer = {
  id: string,
  c_user: boolean,
  name: string,
  address: string,
  products: Product[]
}