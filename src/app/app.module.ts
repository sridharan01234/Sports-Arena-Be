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
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationInterceptor } from './core/authentication.interceptor';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FooterComponent } from './footer/footer.component';
import { PhoneFormatPipe } from './shared/phone-format.pipe';


@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    PasswordValidationDirective,
    RegisterComponent,
    HeaderComponent,
    ResetpasswordComponent,
    FooterComponent,
    PhoneFormatPipe
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
      closeButton: true
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
