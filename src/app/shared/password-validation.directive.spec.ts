import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidationDirective } from './password-validation.directive';
 
describe('PasswordValidationDirective', () => {
  let directive: PasswordValidationDirective;
  let form: FormGroup;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });
 
  beforeEach(() => {
    directive = new PasswordValidationDirective();
    form = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  });
 
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
 
  it('should return null if password or confirmPassword is empty', () => {
    const result = directive.PasswordMatchValidation(form);
    expect(result).toBeNull();
  });
 
  it('should return null if confirmPassword has other errors', () => {
    form.controls['confirmPassword'].setErrors({ required: true });
    const result = directive.PasswordMatchValidation(form);
    expect(result).toBeNull();
  });
 
  it('should return passwordMismatch error if passwords do not match', () => {
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('differentpassword');
    const result = directive.PasswordMatchValidation(form);
    expect(result).toEqual({ passwordMismatch: true });
  });
 
  it('should return null if passwords match', () => {
    form.controls['confirmPassword'].setValue('Password@123');
    form.controls['confirmPassword'].setValue('Password@123');
    const result = directive.PasswordMatchValidation(form);
    expect(result).toBeNull();
  });
 
  it('should return passwordMismatch error if confirmPassword has other errors', () => {
    form.controls['confirmPassword'].setErrors({ required: true });
    form.controls['password'].setValue('Password123');
    form.controls['confirmPassword'].setValue('password@123');
    const result = directive.PasswordMatchValidation(form);
    expect(result).toEqual({ passwordMismatch: true });
  });
});