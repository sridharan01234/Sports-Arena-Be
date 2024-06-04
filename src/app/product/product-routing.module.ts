import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  { path: 'product/view/:id', title: 'Product-View', component: ProductViewComponent },
  { path: 'product', title: "Product", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
