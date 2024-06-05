import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhoneFormatPipe } from '../../phone-format.pipe';



@NgModule({
  declarations: [SharedComponent,HeaderComponent,FooterComponent,PhoneFormatPipe],
  imports: [
    CommonModule,
   
  ],
  exports:[HeaderComponent,FooterComponent]
})
export class SharedModule { }
