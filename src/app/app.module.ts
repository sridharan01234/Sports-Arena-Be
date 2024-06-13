import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInterceptor } from './core/authentication.interceptor';
import { PasswordValidationDirective } from './customvalidation/password-validation.directive';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductModule } from './product/product.module';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';


import { AddtocartComponent } from './addtocart/addtocart.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/components/shared/shared.module';
import { DateValidatorDirective } from './shared/date-validator.directive';
import { AuthserviceService } from './shared/services/authservice.service';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentRegisterComponent } from './tournament-register/tournament-register.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordValidationDirective,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    PasswordValidationDirective,
    RegisterComponent,
    ResetpasswordComponent,
    AddtocartComponent,
    DateValidatorDirective,
    TournamentComponent,
    TournamentRegisterComponent,
    AddTournamentComponent

  ],




  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    ProductModule,
    SharedModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    NgbModule,


  ],
  providers: [AuthserviceService, { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent],

})
export class AppModule { }
