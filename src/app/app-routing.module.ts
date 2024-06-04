import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


 

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',title:'Login',component:LoginComponent},
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
