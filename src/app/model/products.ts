export interface Product {
    productId:number,
    productName: string;
    productImage: string;
    productPrice: number;
    productDescription: string;
    productSize?: string[];
  }
  
  export interface Products {
    cricket: Product[];
    football: Product[];
    kabaadi: Product[];
  }