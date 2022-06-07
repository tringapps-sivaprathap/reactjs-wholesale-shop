export type Retailer = {
  id: string,
  c_user: boolean,
  name: string,
  address: string,
  products: {
    name: string,
    stock: number
  }[]
}

export type Inputs = {
  cart: {
    name: string,
    quantity: number
  }[]
}