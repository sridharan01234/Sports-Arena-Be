import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { }
  public loginAuthenticate(token:any)
  {
    const{jwt}=token;
    console.log(jwt)
    sessionStorage.setItem('token',jwt)
  }
  public loggedIn()
  {
    return sessionStorage.getItem('token')
  }
  public async logout() {
   
    await this.http.get('http://172.24.220.187/logout').subscribe(res=>
      {
        console.log(res)
        sessionStorage.removeItem('token');
      }
     );
   
  }
}
