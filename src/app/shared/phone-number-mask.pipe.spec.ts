import { PhonenomaskPipe } from './phone-no-mask.pipe';

describe('PhoneNoMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new PhonenomaskPipe();
    expect(pipe).toBeTruthy();
  });
});
