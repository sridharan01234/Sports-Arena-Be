import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route:Router,public authService:AuthserviceService)
  {

  }
 public navigateTo(route:string)
 {
   this.route.navigate([`/${route}`])
 }

}
