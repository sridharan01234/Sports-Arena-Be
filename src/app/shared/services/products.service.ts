import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product} from 'src/app/model/products';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://172.24.220.187';

  getProducts():Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/product/all`);
  }
  getProduct(id:number)
  {
    console.log("Ser",id)
    return this.http.get<Product>(`${this.apiUrl}/product?id=${id}`);
  }

  addtocart(product:Product){
    return this.http.post(`http://localhost:3000/addtocart`,product)
  }

}