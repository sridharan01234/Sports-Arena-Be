import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidationDirective } from '../customvalidation/password-validation.directive';
import { HttpClient } from '@angular/common/http';
import { OtpResponse } from '../model/otpResponse';
import { EmailResponse } from '../model/emailResponse';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public resetPassword!: FormGroup;
  public showPassword: Boolean = false;
  public showConfirmedPass: Boolean = false;
  public passwordValidTextVisible: boolean = false;
  public passwordValidation = new PasswordValidationDirective();
  public emailRegExp: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/;
  public passwordRegExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  public otpRegExp: RegExp = /^\d+$/;
  public minimumCharacter!: boolean;
  public upperCase!: boolean;
  public lowerCase!: boolean;
  public digit!: boolean;
  public specialCharacter!: boolean;
  public pin: boolean = false;
  public disableButton: boolean = true;
  public message: boolean = false;
  public viewPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public route: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.resetPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegExp)]],
      otp: ['', [Validators.required, Validators.pattern(this.otpRegExp)]],
      newPassword: ['', [Validators.required, Validators.pattern(this.passwordRegExp)]],
      confirmNewPassword: ['', [Validators.required]]
    },
      { validators: this.passwordValidation.PasswordValidation }
    )
  }

  getEmail(email: Event): void {
    const enteredEmail = (email.target as HTMLInputElement).value;
    this.http.post<EmailResponse>('http://172.24.220.187/user/verify', { email: enteredEmail })
      .subscribe((res: EmailResponse) => {
        if (res.message === "Email verified") {
          this.message = true;
        }
        else {
          this.message = false;
        }
      })
  }

  getOtp(): void {
    if (this.resetPassword.get('email')?.valid) {
      this.http.post('http://172.24.220.187/password/reset', { email: this.resetPassword.get('email')?.value })
        .subscribe(() => {
          this.pin = true;
          this.disableButton = false;
        })
    }
  }

  onOtpChange(otp: string): void {
    this.resetPassword.get('otp')?.setValue(otp);
    this.resetPassword.get('otp')?.markAsTouched();
    this.resetPassword.get('otp')?.markAsDirty();

    if (this.resetPassword.get('otp')?.valid) {
      this.http.post<OtpResponse>('http://172.24.220.187/otp/verify', { email: this.resetPassword.get('email')?.value, otp: otp })
        .subscribe((res: OtpResponse) => {
          if (res.message === "Correct OTP") {
            this.viewPassword = true;
          }
          else {
            this.viewPassword = false;
          }
        })
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleConfirmPasswordVisibility(): void {
    this.showConfirmedPass = !this.showConfirmedPass;
  }

  public checkPasswordValid(password: Event): void {
    const enteredPassword = (password.target as HTMLInputElement).value;
    this.minimumCharacter = this.resetPassword.controls['newPassword'].value.match('.{8,}')
    this.upperCase = this.resetPassword.controls['newPassword'].value.match('^(?=.*[A-Z])');
    this.lowerCase = this.resetPassword.controls['newPassword'].value.match('^(?=.*[a-z])');
    this.digit = this.resetPassword.controls['newPassword'].value.match('(.*[0-9].*)');
    this.specialCharacter = this.resetPassword.controls['newPassword'].value.match('(?=.*[!@#$%^&*])');
    if (enteredPassword != '' && this.upperCase && this.lowerCase && this.digit && this.specialCharacter && enteredPassword.length >= 8) {
      this.passwordValidTextVisible = false;
    }
    else {
      this.passwordValidTextVisible = true;
    }
  }

  public onConfirm(): void {
    if (this.resetPassword.valid) {
      this.http.post('http://172.24.220.187/password/change', { email: this.resetPassword.get('email')?.value, password: this.resetPassword.get('newPassword')?.value })
        .subscribe(() => {
          this.toast.success('Password Reset Successfull');
          this.route.navigateByUrl('login');
        })
    }
    else {
      this.toast.warning('Invalid Password');
    }
  }
}