import { Component } from '@angular/core';
import { Products } from '../model/products';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public products!:Products
  constructor(private http:HttpClient,private productService:ProductsService)
  {

  }
  ngOnInit()
  {
    this.productService.getProducts().subscribe((res)=>
    {
      this.products=res
      console.log(this.products)
    })
    
  }
  
  
  

  
}
