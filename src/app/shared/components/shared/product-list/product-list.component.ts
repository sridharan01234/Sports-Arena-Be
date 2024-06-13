// product-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products!: Product[];
  public filteredProducts!: Product[];
  private categorySubscription!: Subscription;

  constructor(private productService: ProductsService, private route: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res.data;
      this.filteredProducts = this.products; 
    });

    this.categorySubscription = this.productService.selectedCategories$.subscribe(category => {
      this.filterProducts(category);
    });
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  private filterProducts(category: string | null) {
    if (this.products && category) {
      this.filteredProducts = this.products.filter(prod => prod.productCategory === category);
    } else {
      this.filteredProducts = this.products;
    }
    console.log(this.filteredProducts);
  }

  navigateToProductView(id: string) {
    this.route.navigate([`/product/view/${id}`]);
  }
}
