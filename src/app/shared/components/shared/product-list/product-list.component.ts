import { Component } from '@angular/core';
import { Product } from 'src/app/model/products';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  public products!:Product[]
  constructor(private productService:ProductsService)
  {

  }
  ngOnInit()
  {
    this.productService.getProducts().subscribe((res:any)=>
    {
      this.products=res
      console.log(res)
    })
    
  }

}
