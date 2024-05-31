import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  public showPassword:boolean=false;
  constructor(private fb:FormBuilder,private http:HttpClient, private toastr:ToastrService)
  {
    
  }
  ngOnInit():void{
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]

    })

  }
  public togglePasswordVisibility():void
  {
    this.showPassword=!this.showPassword
  }
  public login():void
  {
    console.log(this.loginForm.value)
    this.http.post('http://172.24.220.187/login',this.loginForm.value).subscribe((res)=>
    {
    
      console.log(res)
      this.toastr.success('Login successful!');
    },(err)=>{
    alert(`Error ${err}`)
    });
  }
 

}
