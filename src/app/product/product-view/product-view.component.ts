import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private route: ActivatedRoute,
    private toastr:ToastrService
  ) { }

  public currentRoute!: string | null;
  public product!:Product;
  public productDetails!:any;
  public size!:string;

  ngOnInit() {

    this.currentRoute = this.route.snapshot.paramMap.get('id');
    console.log(this.currentRoute);
    this.getProductDetails();
  }

  getProductDetails() {
    this.productService.getProducts()
      .subscribe((res:any) => {
        this.product = res.filter((value: { productId: string; }) => {
          if (value.productId === this.currentRoute) {
            console.log(value)
            this.productDetails = value;
          }
        })
        console.log(`details`,this.productDetails);
      }
      );
  }

  createSize(productSize:string){
    console.log('wedf',productSize);
    this.size=productSize
    this.productDetails.productSize=this.size;
  }

  addtoCart(product:Product){
  if(this.productDetails.productSize && !this.size){
    this.toastr.warning('Please choose Size!');
  }
  else{
    this.productService.addtocart(product)
        .subscribe((res)=>{
          this.toastr.success('Added to the cart!');
          console.log('addeddd',res);
      })
  }
  }
}