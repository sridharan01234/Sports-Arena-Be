import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/components/shared/shared.module';



@NgModule({
  declarations: [
    ProductComponent,
    ProductViewComponent,
    
  
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
   
   
  ],
  
})
export class ProductModule { }
