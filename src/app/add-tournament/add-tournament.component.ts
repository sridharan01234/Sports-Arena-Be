import { Component, OnInit, inject } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateValidatorDirective } from '../shared/date-validator.directive';
@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit{
  addTournament!:FormGroup;
  private namePattern: RegExp = /^[A-za-z0-9]+(?: [a-zA-Z0-9]+)*$/;
  public phoneNoPattern: RegExp = /^[0-9-]+$/;
  public emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  public minDate!:string;
  public dateValidator=new DateValidatorDirective();
  public activeModal:NgbActiveModal = inject(NgbActiveModal);
  public submitValid:boolean = false;


  constructor(private form:FormBuilder){}

  ngOnInit(): void {
    this.addTournament=this.form.group({
      tournamentName:['',[Validators.required,Validators.pattern(this.namePattern)]],
      tournamentLocation:['',[Validators.required,Validators.pattern(this.namePattern)]],
      tournamentStartDate:['',[Validators.required]],
      tournamentEndDate:['',[Validators.required]],
      organizerName:['',[Validators.required,Validators.pattern(this.namePattern)]],
      phoneNumber:['',[Validators.required,Validators.pattern(this.phoneNoPattern)]],
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      tournamentImage:['',[Validators.required]],
      tournamentDescription:['',[Validators.required]]
    },{validators:[this.dateValidator.StartEndDateValidation]})
    
    this.setMinDate();    

  }

  get tournamentFormControls(){
    return this.addTournament.controls;
  }

 getTournamentDetails(){
  if(this.addTournament.valid){
    this.activeModal.close(this.addTournament.value);
  }
  else 
    this.submitValid=true;  
 }

 hideInvalidError(){
  this.submitValid= false;
 }


 setMinDate(){
       this.minDate = new Date(). toISOString(). split('T')[0];
 }
  

}
