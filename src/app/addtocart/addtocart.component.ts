import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AddtoCart } from '../model/addtocart';
@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'],
})
export class AddtocartComponent implements OnInit {
  constructor(private httpRequest:HttpClient) {}
  products!: AddtoCart[];
  totalQuantity: number = 0;
  totalPrice!: number;

  ngOnInit(): void {
    this.getProducts();
  }

  public updateQuantity(id:string,status:string){
   this.getProduct(id).subscribe((data:AddtoCart):void=>{
        let product:AddtoCart = data;
        if(status=='increase' && product.quantity>=0){
         const oneProductPrice = this.findOneProductPrice(product.quantity,product.price);
          product.quantity++;
          product.price +=oneProductPrice;
        }
        else if(status=='decrease' && product.quantity>0){
          const oneProductPrice = this.findOneProductPrice(product.quantity,product.price);
          product.quantity--;
          product.price-=oneProductPrice;

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
    this.httpRequest.get<AddtoCart[]>('http://localhost:3000/products').subscribe((data:AddtoCart[]): void=>{
      this.products= data;    
    this.calculatePrice()

    });
  }

  private getProduct(id:string){
     return this.httpRequest.get<AddtoCart>('http://localhost:3000/products/'+id);
  }

  private updateProduct(id:string,product:AddtoCart){
      return this.httpRequest.put('http://localhost:3000/products/'+id,product);
  }

  public removeProduct(id:string){
     this.httpRequest.delete('http://localhost:3000/products/'+id).subscribe(()=>{
      this.getProducts();

     })
  }

  private calculatePrice(){
          let price:number[]=[];
          let quantity:number[]=[];
          this.products.map((product)=>{
                 price.push(product.price);
                 quantity.push(product.quantity)
          })
        this.totalPrice =  this.calculateTotalPriceQuantity(price);
        this.totalQuantity=this.calculateTotalPriceQuantity(quantity);
  }

  private calculateTotalPriceQuantity(price:number[]){
      return price.reduce((accumulator,currentValue)=> accumulator+ currentValue);
  }

}
