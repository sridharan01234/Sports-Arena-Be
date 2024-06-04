import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from 'src/app/model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
 
  getProducts():Observable<Products>{
    return this.http.get<Products>('http://localhost:3000/products');
  }

  getProductsView(productId:number){
    return this.http.get(`http://localhost:3000/products/${productId}`)
  }
}
