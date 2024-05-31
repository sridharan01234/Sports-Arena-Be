import { PhoneNumberMaskPipe } from './phone-number-mask.pipe';
 
describe('phonenomask', () => {
  it('create an instance', () => {
    const pipe = new PhoneNumberMaskPipe();
    expect(pipe).toBeTruthy();
  });
 
  it('should return an empty string for an empty input', () => {
    const pipe = new PhoneNumberMaskPipe();
    const result = pipe.transform('');
    expect(result).toBe('');
  });
 
  it('should return a string without masking for 3 digits input', () => {
    const pipe = new PhoneNumberMaskPipe();
    const result = pipe.transform('123');
    expect(result).toBe('123');
  });
 
  it('should return a string with masking for a 6 digits input', () => {
    const pipe = new PhoneNumberMaskPipe();
    const result = pipe.transform('123456');
    expect(result).toBe('123-456');
  });
 
  it('should return a string with masking for a 10 digits input', () => {
    const pipe = new PhoneNumberMaskPipe();
    const result = pipe.transform('1234567890');
    expect(result).toBe('123-456-7890');
  });
 
  it('should truncate an input longer than 10 digits', () => {
    const pipe = new PhoneNumberMaskPipe();
    const result = pipe.transform('1234567890123');
    expect(result).toBe('123-456-7890');
  });
});
 