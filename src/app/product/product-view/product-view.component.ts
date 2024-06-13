import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductResponse, ProductViewResponse } from 'src/app/model/products';
import { ProductsService } from 'src/app/shared/services/products.service';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  public currentRoute!: any;
  public productDetails!: any;
  public size!: string;

  ngOnInit() {
    this.currentRoute = (this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.currentRoute).subscribe((res: ProductViewResponse) => {
      this.productDetails = res.data
    }
    )
  }

  createSize(productSize: string) {
    this.size = productSize
    this.productDetails.productSize = this.size;
  }

  addtoCart() {

    if (this.productDetails.productSize.length > 0 && !this.size) {
      this.toastr.warning('Please choose Size!');
    }
    else {

      if (!this.productDetails.productSize.length) {
        this.productDetails.productSize = 'NA';
      }
      this.productService.addtocart(this.productDetails)
        .subscribe((res: ProductResponse) => {
          const response = res;
          if (response.status === 'success') {
            this.toastr.success('Product added to the cart');
          }
        })

    }
  }
}
