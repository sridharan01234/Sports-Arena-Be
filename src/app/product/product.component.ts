import { Component } from '@angular/core';
import { Product } from '../model/products';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public products!:Product
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
    this.http.get('http://172.24.220.187/user/profile').subscribe((data)=>
    {
      console.log(data)
    })
    
  }
  
  
  

  
}
