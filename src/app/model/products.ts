export interface Product {
    productId:string,
    productName: string;
    productMainImage: string;
    productImages: string[];
    productPrice: number;
    productDescription: string;
    productSize?: string[] | string;
    productCategory:string;
    productQuantity:number;
    id:string;
    productStock:number
  }
  

  export interface ProductViewResponse{
    status:string,
    data:Product
 }
  export interface ProductResponse{
     status:string,
     data:string
  }