import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PasswordValidationDirective } from './customvalidation/password-validation.directive';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { AuthenticationInterceptor } from './core/authentication.interceptor';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [AppComponent,
     LoginComponent,
     PasswordValidationDirective,
     RegisterComponent,
      ForgotpasswordComponent,
      HomeComponent,
      
    
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
