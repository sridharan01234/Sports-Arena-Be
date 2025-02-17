import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../shared/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  public showPassword:boolean=false;
  constructor(private fb:FormBuilder,private http:HttpClient, private toastr:ToastrService,private authService:AuthserviceService,private route:Router)
  {
    
  }
  ngOnInit():void{
    if(this.authService.loggedIn())
      {
        this.route.navigate([''])
      }
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
    this.http.post('http://172.24.220.187/login',this.loginForm.value).subscribe((res:any)=>
    {
      if(res.status==='success')
        {
          this.authService.loginAuthenticate(res);
          this.route.navigate([''])
         this.toastr.success(res.message);
        }
        if(res.status==='error')
          {
           
           this.toastr.error(res.message);
          }
        console.log(res)
      
    },(err)=>{
    alert(`Error ${err}`)
    });
  }
}