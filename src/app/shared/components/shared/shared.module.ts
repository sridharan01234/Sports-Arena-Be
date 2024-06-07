import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhoneFormatPipe } from '../../phone-format.pipe';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [SharedComponent,HeaderComponent,FooterComponent,PhoneFormatPipe, ProductListComponent],
  imports: [
    CommonModule,
   
  ],
  exports:[HeaderComponent,FooterComponent,ProductListComponent]
})
export class SharedModule { }
