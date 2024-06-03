import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phoneNumber: string): string {
    return `+91 ${phoneNumber.replace(/\d{5}/g, '$& ')}`;
  }
}