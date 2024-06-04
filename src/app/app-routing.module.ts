import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddtocartComponent } from './addtocart/addtocart.component';


 
 





const routes: Routes = [
  {path:'login',title:'Login',component:LoginComponent},
  {path:'home',title:'Home',component:HomeComponent},
  {path:'cart',title:'Home',component:AddtocartComponent},
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
        path:'resetpassword',
        component:ResetpasswordComponent,
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
