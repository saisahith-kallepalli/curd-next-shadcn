export interface Product {
  id: string;
  productName: string;
  price: number;
  status: "Active" | "Inactive" | "Draft" | string;
  sales: number;
  date: string;
}
