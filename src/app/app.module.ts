import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationInterceptor } from './core/authentication.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';



@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
