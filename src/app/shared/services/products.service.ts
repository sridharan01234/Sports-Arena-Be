import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product} from 'src/app/model/products';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/products';

  getProducts():Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}`);
  }


  addtocart(product:Product){
    return this.http.post(`http://localhost:3000/addtocart`,product)
  }

}