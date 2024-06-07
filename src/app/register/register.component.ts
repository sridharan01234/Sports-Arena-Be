import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidationDirective } from '../shared/password-validation.directive';
import { PhoneNumberMaskPipe } from '../shared/phone-number-mask.pipe';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DateValidatorDirective } from '../shared/date-validator.directive';
 
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
  public namePattern: RegExp = /^[A-za-z]+(?: [a-zA-Z]+)*$/;
  public phoneNoPattern: RegExp = /^[0-9-]+$/;
  public emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  public passwordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  phonenumber!: String;
  passwordValidTextVisible: boolean = false;
  confirmPasswordValidation = new PasswordValidationDirective();
  dateValidator = new DateValidatorDirective();
  isContainUppercase!: boolean;
  isContainLowercase!: boolean;
  isContainDigit!: boolean;
  isContainSplChar!: boolean;
  isContainValidLength!: boolean;
  private router: Router = inject(Router);
  public isFormValid: boolean = true;
   dateOfBirth!:Date;
 
  constructor(
    private regFormBuilder: FormBuilder,
    private phoneNumberMask: PhoneNumberMaskPipe,
    private http: HttpClient,
    private toastr: ToastrService
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
          [Validators.required],
        ],
        gender: ['', [Validators.required]],
        phoneNumber: [
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
      { validators:[ this.confirmPasswordValidation.PasswordMatchValidation,this.dateValidator.currentDateValidation] }
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
    if (this.regForm.valid) {
      this.isFormValid = true;
       this.calculatingAge();    
       console.log(this.regForm.value);
              
      this.http
        .post('http://172.24.220.187/register', this.regForm.value)
        .subscribe(
          (res:any) => {
            this.regForm.get('age')?.setValue(this.dateOfBirth);   
            if(res.message == 'Registration successful')
            {
               this.toastr.success('Registered successfully');
               this.router.navigate(['login']);
            }
            else if(res.message == 'Email already exists') {             
              this.toastr.error(res.message);
            }  
            else{
              this.toastr.error(res.message);
            }
          },
          (err) => {
            console.log(`error`,err);
          }
        );
    } else {
      this.isFormValid = false;
    }    
  }
 
  public phoneNoMask(enteredPhoneno: Event): void {
    const targetedPhoneNo = (enteredPhoneno.target as HTMLInputElement).value;
    this.phonenumber = targetedPhoneNo
      .split('')
      .filter((digit) => digit != '-')
      .join('');
    const maskedPhoneno = this.phoneNumberMask.transform(this.phonenumber);
    this.registerFormControl['phoneNumber']?.setValue(maskedPhoneno);
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
 
  public disableValidError(){
    this.isFormValid=true;
  }

  public calculatingAge(){
       const dob=this.registerFormControl['age'].value;
       this.dateOfBirth = dob.toString();
       const currentDate=new Date();
       const dobSplits = new Date(dob);
       let age = currentDate.getFullYear() - dobSplits.getFullYear();
       const diffMonth = currentDate.getMonth() - dobSplits.getMonth();

       if(diffMonth < 0 ||(diffMonth==0) && currentDate.getDate()< dobSplits.getDate())
                age--;        
        this.registerFormControl['age'].setValue(age);   
  }

}