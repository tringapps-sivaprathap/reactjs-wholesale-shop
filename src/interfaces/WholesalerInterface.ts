export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  unit: string;
}

export interface Wholesaler {
  name: string;
  products: Product[];
}