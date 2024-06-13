// product.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../shared/services/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products!: any[];
  categories = [
    'cricket', 'football', 'volleyball', 'kabaddi', 'hockey', 'gym', 'kids', 'shoes', 'tshirt'
  ];

  selectedCategory: string | null = null;

  constructor(private http: HttpClient, private productService: ProductsService, ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
    });

    this.http.get('http://172.24.220.187/user/profile').subscribe((data: any) => {
      console.log(data);
    });
  }

  onCategoryChange(event: any, category: string) {
    this.selectedCategory = category;
    this.productService.updateSelectedCategories(this.selectedCategory);
  }
}
