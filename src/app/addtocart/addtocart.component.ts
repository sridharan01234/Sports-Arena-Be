import { Component, OnInit } from '@angular/core';
import { cart, cartResponse, removeCart, updateCart } from '../model/cart';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'],
})
export class AddtocartComponent implements OnInit {
  public products!:cart[];
  public totalQuantity: number = 0;
  public totalPrice!: number;

  constructor(private productService:ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public updateQuantity(id:number,status:string,size:string){
    const foundProduct:cart = this.products.filter((product)=> product.productId==id && product.productSize==size)[0]
    if(status=='increase' && foundProduct.quantity >=0){
              foundProduct.quantity++;
            }
     else if(status=='decrease' && foundProduct.quantity>1){
              foundProduct.quantity--;
            }
        const updatedQuantity:updateCart = {"productId":foundProduct.productId, "quantity":foundProduct.quantity,"productSize":foundProduct.productSize}; 
            this.productService.updateCartItem(updatedQuantity).subscribe(()=>{
              this.calculatePrice();
            })
    }

  private getProducts(){
    this.productService.getCartProducts().subscribe((response:cartResponse):void=> {
        this.products=response.data;
        this.calculatePrice();    
        console.log(this.products);
            
    })
}

  public removeProduct(id:number,size:string|number){
    const productid:removeCart={"productId":id,"productSize":size};
    this.productService.removeFromCart(productid).subscribe((data)=>{
       this.getProducts();      
    })
  }

  private calculatePrice(){
          let price:number[]=[];
          let quantity:number[]=[];
          this.products.map((product)=>{
                 price.push(product.productPrice*product.quantity);
                 quantity.push(product.quantity);
          })        
        this.totalPrice =  this.calculateTotalPriceQuantity(price);
        this.totalQuantity=this.calculateTotalPriceQuantity(quantity);
  }


  private calculateTotalPriceQuantity(price:number[]){
      return price.reduce((accumulator,currentValue)=> accumulator+ currentValue);
  }

}

