export interface cart {
    id:string,
    productId:number,
    productName: string,
    productMainImage: string,
    productPrice: number,
    productDescription: string,
    productSize: string,
    quantity:number,
  }
  

  export interface cartResponse{
     status:string,
     data:Array<cart>
  }

export interface removeCart{
   productId:number,
   productSize:number| string
}

export interface updateCart{
   productId:number ,
   quantity:number,
   productSize:number | string
}