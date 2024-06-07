import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PasswordValidationDirective } from './customvalidation/password-validation.directive';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { AuthenticationInterceptor } from './core/authentication.interceptor';
import { HomeComponent } from './home/home.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProductModule } from './product/product.module';


import { AddtocartComponent } from './addtocart/addtocart.component';

import { AuthserviceService } from './shared/services/authservice.service';
import { SharedComponent } from './shared/components/shared/shared.component';
import { SharedModule } from './shared/components/shared/shared.module';
import { DateValidatorDirective } from './shared/date-validator.directive';




@NgModule({
  declarations: [AppComponent,
     LoginComponent,
     PasswordValidationDirective,
     RegisterComponent,
      HomeComponent,
      LoginComponent,
    PasswordValidationDirective,
    RegisterComponent,
    ResetpasswordComponent,

  
    AddtocartComponent,
        DateValidatorDirective
      
    ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ProductModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    ProductModule,
    SharedModule
  ],
  providers: [AuthserviceService,{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
