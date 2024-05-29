import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  public showPassword:boolean=false;
  constructor(private fb:FormBuilder,private http:HttpClient)
  {
    
  }
  ngOnInit():void{
    this.loginForm=this.fb.group({
      username:['',[Validators.required,Validators.email]],
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
    this.http.post('http://192.168.43.173',this.loginForm.value).subscribe((res)=>
    {
    },(err)=>{
    alert(`Error ${err}`)
    });
  }

}
