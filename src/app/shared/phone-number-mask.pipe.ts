import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonenomask',
})
export class PhoneNumberMaskPipe implements PipeTransform {
  transform(phoneno: String): String {
    if (phoneno.length == 0) {
      phoneno = '';
    } else if (phoneno.length <= 3) {
      phoneno = phoneno.replace(/^(\d{0,3})/, '$1');
    } else if (phoneno.length <= 6) {
      phoneno = phoneno.replace(/^(\d{0,3})(\d{0,3})/, '$1-$2');
    } else if (phoneno.length <= 10) {
      phoneno = phoneno.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
    } else if (phoneno.length > 10) {
      phoneno = phoneno.substring(0, 10);
      phoneno = phoneno.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
    }
    return phoneno;
  }
}
