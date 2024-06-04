import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'login',title:'Login',component:LoginComponent},
  {path:'home',title:'Home',component:HomeComponent},
  {path:'',title:'Reset Password',redirectTo:'login', pathMatch:"full"},
  {
    path: 'login',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
      {
        path:'forgotpassword',
        component:ForgotpasswordComponent,
        title:'Reset Password'
      }
    ],
  }
]


@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
