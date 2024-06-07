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

  public currentRoute!: any;
  public product: any;
  public productDetails: any;
  public size!:string;

  ngOnInit() {

    
    this.currentRoute = (this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(this.currentRoute).subscribe((res:any)=>
      {
        
        this.productDetails=res.data
        console.log(this.productDetails)
      }
    )
    console.log(this.currentRoute);
    
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



  }}
