import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[PasswordValidation]',
})
export class PasswordValidationDirective {
  constructor() {}

  PasswordMatchValidation(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const confirmpassword = form.get('confirmPassword');

    if (!password || !confirmpassword) {
      return null;
    }

    if (
      confirmpassword.errors &&
      !confirmpassword.errors?.['passwordMismatch']
    ) {
      return null;
    }

    if (password.value !== confirmpassword.value) {
      confirmpassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmpassword.setErrors(null);
      return null;
    }
  }
}
