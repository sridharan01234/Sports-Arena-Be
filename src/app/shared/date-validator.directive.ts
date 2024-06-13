import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appDateValidator]',
})
export class DateValidatorDirective {
  constructor() {}

  currentDateValidation(form: AbstractControl): ValidationErrors | null {
    const currentDate: Date = new Date();
    const enteredDate = form.get('age');
    if(!enteredDate)
      return null;
    else if (new Date(enteredDate.value) > currentDate){
             enteredDate.setErrors({'lessthanToday':true});
             return {'lessthanToday':true};
    }
    return null;
  }


  StartEndDateValidation(form: AbstractControl): ValidationErrors | null {
    const startDate = form.get('tournamentStartDate');
    const endDate = form.get('tournamentEndDate');
    if(!endDate)
      return null;
    else if (startDate && startDate.value > endDate.value){
      console.log(startDate.value > endDate.value);
      
             endDate.setErrors({'lessthenStartDate':true});
             return {'lessthenStartDate':true};
    }
    return null;
  }

}
