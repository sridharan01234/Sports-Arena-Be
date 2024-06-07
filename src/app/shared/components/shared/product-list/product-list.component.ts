import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/products';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  public products!:Product[]
  constructor(private productService:ProductsService,private route:Router)
  {

  }
  ngOnInit()
  {
    this.productService.getProducts().subscribe((res:any)=>
    {
      console.log("Hi")
      this.products=res.data
      console.log(res)
    })
    
    
  }
  navigateToProductView(id:string)
  {
    console.log("Hi")
     this.route.navigate([ `/product/view/${id}`])
  }

}
