import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/products';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }

  public currentRoute: any;
  public product: any;
  public productDetails: any;


  ngOnInit() {

    this.currentRoute = this.route.snapshot.paramMap.get('id');
    console.log(this.currentRoute);
    this.getProductDetails();
  }

  getProductDetails() {
    this.productService.getProducts()
      .subscribe((res:any) => {
        this.product = res.filter((x: { productId: string; }) => {
          if (x.productId === this.currentRoute) {
            console.log(x)
            this.productDetails = x;
          }
        })
        console.log(`11111111111111111`,this.productDetails);
      }
      );
  }

  increaseQuantity() {
    this.productDetails.productQuantity++;
    this.productService.updateQuantity(this.productDetails.id, this.productDetails)
      .subscribe((res) => {
        console.log(res);
      })
  }


  decreaseQuantity(){
    if(this.productDetails.productQuantity > 1){
      this.productDetails.productQuantity--;
      this.productService.updateQuantity(this.productDetails.id,this.productDetails)
      .subscribe((res)=>{
        console.log(res);
      })
    }
  }

  createSize(productSize:string){
    console.log('wedf',productSize);
    const size=productSize
    this.productDetails.productSize=size;
  }


  addtoCart(product:Product){
    this.productService.addtocart(product)
    .subscribe((res)=>{
      console.log('addeddd',res);
    })
  }



}