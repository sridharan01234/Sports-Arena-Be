import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(private productService: ProductsService,
        private route:ActivatedRoute
  ) { }
public currentRoute:any;
public product:any;
  ngOnInit() {


this.currentRoute=this.route.snapshot.paramMap.get('id')
    this.productService.getProductsView(this.currentRoute)
    .subscribe((res)=>{
      console.log(res);
      
    })
  }



  public products = [
    {
      imgUrl: '/assets/images/cricket.jpg',
      name: 'Stump',
      price: 233,
      quantity: 1,
      description: 'Traditionally cricketers play in all-white kit, but in limited overs cricket they wear club or team colours. In addition to the basic kit, some players wear protective gear to prevent injury caused by the ball, which is a hard, solid spheroid made of compressed leather with a slightly raised sewn seam enclosing a cork core layered with tightly wound string. '
    }
  ]



}