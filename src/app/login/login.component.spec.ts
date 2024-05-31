import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

 
  it('should login successfully', () => {
    const loginData = { email: 'test@example.com', password: 'password123' };
    component.loginForm.setValue(loginData);

    component.login();
    
    const req = httpTestingController.expectOne('http://172.24.220.187/login');
    expect(req.request.method).toEqual('POST');
    req.flush({ success: true });

    fixture.detectChanges();
    
    expect(component.loginForm.value).toEqual(loginData);
    // Additional checks for the response handling can be added here
  });

  it('should handle login error', () => {
    const loginData = { email: 'test@example.com', password: 'password123' };
    component.loginForm.setValue(loginData);

    spyOn(window, 'alert');
    
    component.login();

    const req = httpTestingController.expectOne('http://172.24.220.187/login');
    req.flush({ message: 'Login failed' }, { status: 401, statusText: 'Unauthorized' });

    fixture.detectChanges();
    
    expect(window.alert).toHaveBeenCalledWith('Error HttpErrorResponse');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalsy();

    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTruthy();

    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalsy();
  });
});
