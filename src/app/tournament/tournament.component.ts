import { Component } from '@angular/core';
import { TournamentRegisterComponent } from '../tournament-register/tournament-register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {

  constructor(private modalService:NgbModal){}

  tournaments = [
    {
      tournamentId:1,
      tournamentName: 'Aspire premier league',
      tournamentLocation: 'Navalur',
      tournamentImage: "assets/images/tournamentImages/APL.png",
      tournamentDescription:'The match is played in red tennis ball.It is 10 over match per side.Committe has all rights to change the match dates.',
      tournamentStartDate:'2024-06-22',
      tournamentEndDate:'2024-07-07',
      organizerName:'Mugesh',
      phoneNumber:'9879065432',
      email:'mugesh@gmail.com'
    },
   
  ]



  public open() {
    this.modalService.open(TournamentRegisterComponent,{size:'lg'}).result.then(
      (result) => {  console.log(`result`,result);
      }
    );
  }





}
