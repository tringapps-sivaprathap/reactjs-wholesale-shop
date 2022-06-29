export interface Product {
  name: string;
  stock: number;
  unit: string;
}

export interface Retailer {
  id: string;
  date: Date;
  c_user: boolean;
  name: string;
  address: string;
  products: Product[];
}