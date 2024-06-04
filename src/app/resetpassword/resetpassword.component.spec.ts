import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ResetpasswordComponent } from './resetpassword.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;
  let formBuilder: FormBuilder;
  let httpTestingController: HttpTestingController;
  let toastrService: ToastrService;
  let route: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetpasswordComponent],
      imports: [ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
      providers: [FormBuilder, ToastrService, Router]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.resetPassword = formBuilder.group({
      newPassword: ['']
    });
    component.resetPassword = formBuilder.group({
      email: ['test@example.com'],
      newPassword: ['Password1!']
    });
    route = TestBed.inject(Router)
    httpTestingController = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create resetPassword form with correct validators', () => {
    const formGroup = component.resetPassword;

    expect(formGroup).toBeTruthy();

    const emailControl = formGroup.get('email');
    const otpControl = formGroup.get('otp');
    const newPasswordControl = formGroup.get('newPassword');
    const confirmNewPasswordControl = formGroup.get('confirmNewPassword');

    expect(emailControl).toBeTruthy();
    expect(emailControl?.hasError('required')).toBeTrue();
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTrue();
    emailControl?.setValue('test@example.com');
    expect(emailControl?.hasError('pattern')).toBeFalse();

    expect(otpControl).toBeTruthy();
    expect(otpControl?.hasError('required')).toBeTrue();
    otpControl?.setValue('');
    expect(otpControl?.hasError('required')).toBeTrue();

    expect(newPasswordControl).toBeTruthy();
    expect(newPasswordControl?.hasError('required')).toBeTrue();
    newPasswordControl?.setValue('');
    expect(newPasswordControl?.hasError('required')).toBeTrue();

    expect(confirmNewPasswordControl).toBeTruthy();
    expect(confirmNewPasswordControl?.hasError('required')).toBeFalse();
    confirmNewPasswordControl?.setValue('');
    expect(confirmNewPasswordControl?.hasError('required')).toBeFalse();
  });

  it('should call getEmail and verify email successfully', () => {
    const enteredEmail = 'test@example.com';
    const mockResponse = { message: 'Email verified' };

    component.getEmail({ target: { value: enteredEmail } } as any);

    const req = httpTestingController.expectOne('http://172.24.220.187/user/verify');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: enteredEmail });

    req.flush(mockResponse);

    expect(component.message).toBeTrue();
  });

  it('should call getEmail and handle non-verified email', () => {
    const enteredEmail = 'test@example.com';
    const mockResponse = { message: 'Email not verified' };

    component.getEmail({ target: { value: enteredEmail } } as any);

    const req = httpTestingController.expectOne('http://172.24.220.187/user/verify');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: enteredEmail });

    req.flush(mockResponse);

    expect(component.message).toBeFalse();
  });


  it('should call getOtp and set pin to true when email is valid', () => {
    component.resetPassword.get('email')?.setValue('test@example.com');
    component.getOtp();
    const req = httpTestingController.expectOne('http://172.24.220.187/password/reset');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com' })
    req.flush({});
    expect(component.pin).toBeTrue();
    expect(component.disableButton).toBeFalse();
  });

  it('should not call getOtp when email is invalid', () => {
    component.resetPassword.get('email')?.setValue('');
    component.getOtp();
    httpTestingController.expectNone('http://172.24.220.187/password/reset');
    expect(component.pin).toBeFalse();
    expect(component.disableButton).toBeTrue();
  });


  it('should set OTP value and make HTTP request when OTP is valid', () => {
    component.resetPassword.get('email')?.setValue('test@example.com');
    component.onOtpChange('123456');
    expect(component.resetPassword.get('otp')?.value).toBe('123456');
    expect(component.resetPassword.get('otp')?.touched).toBeTrue();
    expect(component.resetPassword.get('otp')?.dirty).toBeTrue();
    const req = httpTestingController.expectOne('http://172.24.220.187/otp/verify');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', otp: '123456' });
    req.flush({ message: 'Correct OTP' });
    expect(component.viewPassword).toBeTrue();
  });

  it('should not make HTTP request when OTP is invalid', () => {
    component.resetPassword.get('email')?.setValue('test@example.com');
    component.onOtpChange('');
    expect(component.resetPassword.get('otp')?.value).toBe('');
    expect(component.resetPassword.get('otp')?.touched).toBeTrue();
    expect(component.resetPassword.get('otp')?.dirty).toBeTrue();
    httpTestingController.expectNone('http://172.24.220.187/otp/verify');
    expect(component.viewPassword).toBeFalse();
  });


  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalse();
  });

  it('should toggle confirm password visibility', () => {
    expect(component.showConfirmedPass).toBeFalse();
    component.toggleConfirmPasswordVisibility();
    expect(component.showConfirmedPass).toBeTrue();
    component.toggleConfirmPasswordVisibility();
    expect(component.showConfirmedPass).toBeFalse();
  });

  it('should set passwordValidTextVisible to false when password meets all criteria', () => {
    component.resetPassword.get('newPassword')?.setValue('Password1!');
    component.checkPasswordValid({ target: { value: 'Password1!' } } as unknown as Event);
    expect(component.passwordValidTextVisible).toBeFalse();
  });

  it('should set passwordValidTextVisible to true when password does not meet all criteria', () => {
    component.resetPassword.get('newPassword')?.setValue('password'); 
    component.checkPasswordValid({ target: { value: 'password' } } as unknown as Event);
    expect(component.passwordValidTextVisible).toBeTrue();
  });

  it('should make HTTP request and redirect to login page on successful password reset', () => {
    component.resetPassword.get('email')?.setValue('test@example.com');
    component.resetPassword.get('newPassword')?.setValue('Password1!');
    spyOn(toastrService, 'success');
    spyOn(route, 'navigateByUrl');
    component.onConfirm();
    const req = httpTestingController.expectOne('http://172.24.220.187/password/change');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', password: 'Password1!' });
    req.flush({});
    expect(toastrService.success).toHaveBeenCalledWith('Password Reset Successfull');
    expect(route.navigateByUrl).toHaveBeenCalledWith('login');
  });

})