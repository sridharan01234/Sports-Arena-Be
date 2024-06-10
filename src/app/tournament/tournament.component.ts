import { Component } from '@angular/core';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {
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
    register(tournamentId: number) {
      console.log(`Registering for tournament with ID: ${tournamentId}`);
      // Implement registration logic here
    }
}
