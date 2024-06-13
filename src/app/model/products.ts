export interface Product {
    productId:string,
    productName: string;
    productMainImage: string;
    productImages: string[];
    productPrice: number;
    productDescription: string;
    productSize?: string[] | string;
    productCategory:string;
    productStock:number;
    productQuantity:number;
    id:string
  }
  