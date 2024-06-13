import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { cartResponse, removeCart, updateCart } from 'src/app/model/cart';
import { Product, ProductResponse, ProductViewResponse } from 'src/app/model/products';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private selectedCategoriesSubject = new BehaviorSubject<string | null>(null);
  selectedCategories$ = this.selectedCategoriesSubject.asObservable();
  constructor(private http:HttpClient) { }
  private apiUrl = 'http://172.24.220.187';

  public getProducts():Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/product/all`);
  }

 
  public getProduct(id:number)
  {
    return this.http.get<ProductViewResponse>(`${this.apiUrl}/product?id=${id}`);
  }


  public addtocart(product:Product){
    return this.http.post<ProductResponse>(`${this.apiUrl}/cart/add`,product)  
  }
  
  public getCartProducts(){
       return this.http.get<cartResponse>(`${this.apiUrl}/cart/get`);
  }

  public updateCartItem(updatedQuantity:updateCart){
       return this.http.put<cartResponse>(`${this.apiUrl}/cart/add`,updatedQuantity);
  }
   
  public removeFromCart(productId:removeCart){    
        return this.http.post(`${this.apiUrl}/cart/remove`,productId);

  }

 

  updateSelectedCategories(category: string |null) {
    this.selectedCategoriesSubject.next(category);
   

}
}