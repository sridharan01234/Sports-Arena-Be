import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidation]'
})
export class PasswordValidationDirective {

  constructor() { }

  public PasswordValidation(
    resetPassword: AbstractControl): ValidationErrors | null {
    const password = resetPassword.get('newPassword');
    const confirmPassword = resetPassword.get('confirmNewPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ notmatchPassword: true });
      return { notmatchPassword: true };
    }
    else {
      confirmPassword.setErrors(null);
      return null;
    }
  };
}