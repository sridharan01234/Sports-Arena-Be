import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'login',title:'Login',component:LoginComponent},
  // {path:'forgotpassword',title:'Reset Password',component:ForgotpasswordComponent},
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
