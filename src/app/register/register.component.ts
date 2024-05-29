import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidationDirective } from '../shared/password-validation.directive';
import { PhoneNumberMaskPipe } from '../shared/phone-number-mask.pipe';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [PhoneNumberMaskPipe],
})
export class RegisterComponent implements OnInit {
  public regForm!: FormGroup;
  public userGender: Array<string> = ['Male', 'Female', 'Prefer not to say'];
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  private namePattern: RegExp = /^[A-za-z]+(?: [a-zA-Z]+)*$/;
  private phoneNoPattern: RegExp = /^[0-9-]+$/;
  private emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  private passwordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  phonenumber!: String;
  passwordValidTextVisible: boolean = false;
  confirmPasswordValidation = new PasswordValidationDirective();
  isContainUppercase!: boolean;
  isContainLowercase!: boolean;
  isContainDigit!: boolean;
  isContainSplChar!: boolean;
  isContainValidLength!: boolean;

  constructor(
    private regFormBuilder: FormBuilder,
    private phoneNumberMask: PhoneNumberMaskPipe
  ) {}

  ngOnInit(): void {
    this.regForm = this.regFormBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.pattern(this.namePattern),
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern(this.namePattern)],
        ],
        age: [
          '',
          [Validators.required, Validators.min(12), Validators.max(80)],
        ],
        gender: ['', [Validators.required]],
        phoneNo: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.pattern(this.phoneNoPattern),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        password: [
          '',
          [
            Validators.pattern(this.passwordPattern),
            Validators.minLength(8),
            Validators.required,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.confirmPasswordValidation.PasswordMatchValidation }
    );
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get registerFormControl() {
    return this.regForm.controls;
  }

  public submit(): void {
    if (this.regForm.valid) console.log(this.regForm.value);
  }

  public phoneNoMask(enteredPhoneno: Event): void {
    const targetedPhoneNo = (enteredPhoneno.target as HTMLInputElement).value;
    this.phonenumber = targetedPhoneNo
      .split('')
      .filter((digit) => digit != '-')
      .join('');
    const maskedPhoneno = this.phoneNumberMask.transform(this.phonenumber);
    this.registerFormControl['phoneNo']?.setValue(maskedPhoneno);
  }

  public checkPasswordValid(): void {
    const enteredPassword = this.registerFormControl['password'].value;
    this.isContainUppercase = enteredPassword.match('^(?=.*[A-Z])');
    this.isContainLowercase = enteredPassword.match('^(?=.*[a-z])');
    this.isContainDigit = enteredPassword.match('^(?=.*[0-9])');
    this.isContainSplChar = enteredPassword.match('^(?=.*[@$!%*?&])');
    this.isContainValidLength = enteredPassword.match('.{8,}');

    if (
      enteredPassword != '' &&
      this.isContainUppercase &&
      this.isContainLowercase &&
      this.isContainDigit &&
      this.isContainSplChar &&
      enteredPassword.length >= 8
    ) {
      this.passwordValidTextVisible = false;
    } else this.passwordValidTextVisible = true;
  }
}
