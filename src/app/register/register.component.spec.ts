import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { PhoneNumberMaskPipe } from '../shared/phone-number-mask.pipe';
import { RegisterComponent } from './register.component';
 
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formBuilder: FormBuilder;
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, PhoneNumberMaskPipe],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    httpMock = TestBed.inject(HttpTestingController);
    formBuilder = TestBed.inject(FormBuilder);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
  it('should initialize the registration form', () => {
    component.ngOnInit();
    const form = component.regForm;
    expect(form).toBeDefined();
    expect(form instanceof FormGroup).toBeTrue();
 
    expect(form.controls['firstName']).toBeDefined();
    expect(form.controls['firstName'].value).toBe('');
 
    expect(form.controls['lastName']).toBeDefined();
    expect(form.controls['lastName'].value).toBe('');
 
    expect(form.controls['age']).toBeDefined();
    expect(form.controls['age'].value).toBe('');
 
    expect(form.controls['gender']).toBeDefined();
    expect(form.controls['gender'].value).toBe('');
 
    expect(form.controls['phoneNo']).toBeDefined();
    expect(form.controls['phoneNo'].value).toBe('');
 
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['email'].value).toBe('');
 
    expect(form.controls['password']).toBeDefined();
    expect(form.controls['password'].value).toBe('');
 
    expect(form.controls['confirmPassword']).toBeDefined();
    expect(form.controls['confirmPassword'].value).toBe('');
  });
 
  it('should toggles show password', () => {
    expect(component.showPassword).toBeFalse();
    component.toggleShowPassword();
    expect(component.showPassword).toBeTrue();
    component.toggleShowPassword();
    expect(component.showPassword).toBeFalse();
  });
  it('should toggle show ConfirmPassword', () => {
    expect(component.showConfirmPassword).toBeFalse();
    component.toggleShowConfirmPassword();
    expect(component.showConfirmPassword).toBeTrue();
    component.toggleShowConfirmPassword();
    expect(component.showConfirmPassword).toBeFalse();
  });
 
  it('should return the register form controls', () => {
    const formControls = component.regForm;
    expect(formControls.controls['firstName'].value).toBe('');
    expect(formControls.controls['lastName'].value).toBe('');
    expect(formControls.controls['age'].value).toBe('');
    expect(formControls.controls['gender'].value).toBe('');
    expect(formControls.controls['phoneNo'].value).toBe('');
    expect(formControls.controls['email'].value).toBe('');
    expect(formControls.controls['password'].value).toBe('');
    expect(formControls.controls['confirmPassword'].value).toBe('');
  });
 
  it('should submit the registration', () => {
    const formData = {
      firstName: 'Janu',
      lastName: 'Shree',
      age: 30,
      gender: 'Female',
      phoneNo: '123-456-7890',
      email: 'abc@example.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
    };
 
    component.regForm.setValue(formData);
 
    component.submit();
 
    const req = httpMock.expectOne('http://172.24.220.187/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
  });
  
 
  it('should mask phone number', () => {
    const phoneNumber = '1234567890';
    const event = new Event('input') as any;
    Object.defineProperty(event, 'target', {
      value: {
        value: phoneNumber,
      },
    });
    component.phoneNoMask(event);
    expect(component.phonenumber).toBe('1234567890');
    expect(component.registerFormControl['phoneNo'].value).toBe('123-456-7890');
  });
 
  it('should check password validity', () => {
    component.registerFormControl['password'].setValue('Password@123');
    component.checkPasswordValid();
    expect(component.passwordValidTextVisible).toBe(false);
  
    component.registerFormControl['password'].setValue('invalid');
    component.checkPasswordValid();
    expect(component.passwordValidTextVisible).toBe(true);
  
    component.registerFormControl['password'].setValue('PASSWORD@123');
    component.checkPasswordValid();
    expect(component.passwordValidTextVisible).toBe(true);
  
    component.registerFormControl['password'].setValue('password@123');
    component.checkPasswordValid();
    expect(component.passwordValidTextVisible).toBe(true);
  
    component.registerFormControl['password'].setValue('Password@invalid');
    component.checkPasswordValid();
    expect(component.passwordValidTextVisible).toBe(true);
  
    component.registerFormControl['password'].setValue('Password123');
    component.checkPasswordValid();
    expect(component.passwordValidTextVisible).toBe(true);
  });
  
});
 