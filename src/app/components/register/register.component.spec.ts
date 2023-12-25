import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Components
import { RegisterComponent } from './register.component';

// Services
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

// Stubs
import { UserServiceStub } from 'src/app/services/user/user.service.stub';
import { InputComponentStub } from '../shared/input/input.component.stub';
import { ButtonComponentStub } from '../shared/button/button.component.stub';
import { ButtonLinkComponentStub } from '../shared/button-link/button-link.component.stub';
import { NotificationServiceStub } from 'src/app/services/notification/notification.service.stub';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let userService: UserService;
  let notificationService: NotificationService;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        InputComponentStub,
        ButtonLinkComponentStub,
        ButtonComponentStub,
      ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
      ],
      imports: [
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    userService = TestBed.inject(UserService);
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSubmit', () => {
    let userRegisterSpy: jasmine.Spy;
    let setUserLoggedInSpy: jasmine.Spy;
    let setUsernameSpy: jasmine.Spy;
    let setNotificationSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      userRegisterSpy = spyOn(userService, 'userRegister');
      setUserLoggedInSpy = spyOn(userService, 'setUserLoggedIn');
      setUsernameSpy = spyOn(userService, 'setUsername');
      setNotificationSpy = spyOn(notificationService, 'setNotification');
      navigateSpy = spyOn(router, 'navigate');
    });

    describe('and the form is invalid', () => {
      beforeEach(() => {
        component.registerForm = new FormGroup({
          email: new FormControl('', { nonNullable: true, validators: [Validators.minLength(1)] }),
          username: new FormControl('', { nonNullable: true, validators: [Validators.minLength(1)] }),
          password: new FormControl('', { nonNullable: true, validators: [Validators.minLength(1)] }),
          repassword: new FormControl('123', { nonNullable: true, validators: [Validators.maxLength(1)] }),
        });
        component.onSubmit();
      });

      it('should call the notification service with the received error message', () => {
        expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'The form is invalid.' });
      });
    });

    describe('and the form is valid', () => {
      beforeEach(() => {
        component.registerForm = new FormGroup({
          email: new FormControl('example@mail.com', { nonNullable: true }),
          username: new FormControl('exampleUsername', { nonNullable: true }),
          password: new FormControl('abc123', { nonNullable: true }),
          repassword: new FormControl('abc123', { nonNullable: true }),
        });
      });

      describe('and the user service returns data with a status of false', () => {
        beforeEach(() => {
          component.emailExistsError = false;
          component.usernameExistsError = false;
        });
        
        describe('and the type is exists-email', () => {
          const exampleResponse = {
            status: false,
            message: 'Example error message',
            type: 'exists-email',
          };
  
          beforeEach(() => {
            userRegisterSpy.and.returnValue(of(exampleResponse));
            component.onSubmit();
          });
  
          it('should set emailExistsError to true', () => {
            expect(component.emailExistsError).toBeTrue();
          });

          it('should call the notification service with the received error message', () => {
            expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'An error occured.' });
          });
        });
        
        describe('and the type is exists-username', () => {
          const exampleResponse = {
            status: false,
            message: 'Example error message',
            type: 'exists-username',
          };
  
          beforeEach(() => {
            userRegisterSpy.and.returnValue(of(exampleResponse));
            component.onSubmit();
          });
  
          it('should set usernameExistsError to true', () => {
            expect(component.usernameExistsError).toBeTrue();
          });

          it('should call the notification service with the received error message', () => {
            expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'An error occured.' });
          });
        });
      });

      describe('and the user service returns data with a status of true', () => {
        const exampleResponse = {
          status: true,
          message: 'Successfully registered.',
          type: 'success',
        };

        beforeEach(() => {
          userRegisterSpy.and.returnValue(of(exampleResponse));
          component.onSubmit();
        });

        it('should navigate to the login page', () => {
          expect(navigateSpy).toHaveBeenCalledWith(['/login']);
        });

        it('should call the notification service with the received success message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'success', message: exampleResponse.message });
        });
      });

      describe('and the user service throws an error', () => {
        beforeEach(() => {
          userRegisterSpy.and.returnValue(throwError(() => new Error('Error message.')));
          component.onSubmit();
        });

        it('should call the notification service with a generic error message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'An error occurred.' });
        });

        it('should not call anything else', () => {
          expect(setUserLoggedInSpy).not.toHaveBeenCalled();
          expect(setUsernameSpy).not.toHaveBeenCalled();
          expect(navigateSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
