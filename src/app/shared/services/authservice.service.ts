import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }
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
  public logout() {
    sessionStorage.removeItem('token');
   
  }
}
