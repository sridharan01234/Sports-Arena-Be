export interface Product {
    productId:string,
    productName: string;
    productImage: string;
    productPrice: number;
    productDescription: string;
    productSize?: string[] | string;
    productCategory:string;
    productQuantity:number
  }
  