import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/products';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'],
})
export class AddtocartComponent implements OnInit {
  constructor(private httpRequest:HttpClient) {}
  products!: Product[];
  totalQuantity: number = 0;
  totalPrice!: number;

  ngOnInit(): void {
    this.getProducts();
  }

  public updateQuantity(id:string,status:string){
   this.getProduct(id).subscribe((data:Product):void=>{
        let product:Product = data;
        if(status=='increase' && product.productQuantity >=0){
         const oneProductPrice = this.findOneProductPrice(product.productQuantity,product.productPrice);
          product.productQuantity++;
          product.productPrice +=oneProductPrice;
        }
        else if(status=='decrease' && product.productQuantity>1){
          const oneProductPrice = this.findOneProductPrice(product.productQuantity,product.productPrice);
          product.productQuantity--;
          product.productPrice-=oneProductPrice;

        }
            this.updateProduct(id,product).subscribe((data)=>{
                this.getProducts();
            })
         })
  }

  public findOneProductPrice(quantity:number,price:number){
    return price/quantity;

  }

  private getProducts(){
    this.httpRequest.get<Product[]>('http://localhost:3000/addtocart').subscribe((data:Product[]): void=>{
      this.products= data;    
    this.calculatePrice();
    console.log(this.products);
    });
  }

  private getProduct(id:string){
     return this.httpRequest.get<Product>('http://localhost:3000/addtocart/'+id);
  }

  private updateProduct(id:string,product:Product){
      return this.httpRequest.put('http://localhost:3000/addtocart/'+id,product);
  }

  public removeProduct(id:string){
     this.httpRequest.delete('http://localhost:3000/addtocart/'+id).subscribe(()=>{
      this.getProducts();
     })
  }

  private calculatePrice(){
          let price:number[]=[];
          let quantity:number[]=[];
          this.products.map((product)=>{
                 price.push(product.productPrice);
                 quantity.push(product.productQuantity)
          })
        this.totalPrice =  this.calculateTotalPriceQuantity(price);
        this.totalQuantity=this.calculateTotalPriceQuantity(quantity);
  }

  private calculateTotalPriceQuantity(price:number[]){
      return price.reduce((accumulator,currentValue)=> accumulator+ currentValue);
  }

}
