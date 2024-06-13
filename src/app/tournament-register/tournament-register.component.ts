import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tournament-register',
  templateUrl: './tournament-register.component.html',
  styleUrls: ['./tournament-register.component.css']
})
export class TournamentRegisterComponent {

  public tournamentRegForm!: FormGroup;
  public playerNameRegExp: RegExp = /^[A-Za-z]+$/;
  public teamNameRegExp: RegExp = /^[a-zA-Z0-9]*$/;
  public emailRegExp: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  public phoneNumberRegExp: RegExp = /^\d{10}$/;
  public activeModal = inject(NgbActiveModal);

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.tournamentRegForm = this.formBuilder.group({
      playerName: ['', [Validators.required, Validators.pattern(this.playerNameRegExp), Validators.minLength(3)]],
      teamName: ['', [Validators.required, Validators.pattern(this.teamNameRegExp), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegExp)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberRegExp)]],
    })
  }

  public onRegister() {
    if (this.tournamentRegForm.valid) {
      this.activeModal.close(this.tournamentRegForm.value);
      this.toastr.success('Successfully registered!');
    }
  }
}