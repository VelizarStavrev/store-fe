import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';

// Components
import { ProfileComponent } from './profile.component';

// Services
import { UserService } from 'src/app/services/user/user.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

// Stubs
import { UserServiceStub } from 'src/app/services/user/user.service.stub';
import { InputComponentStub } from '../shared/input/input.component.stub';
import { ButtonComponentStub } from '../shared/button/button.component.stub';
import { ToggleComponentStub } from '../shared/toggle/toggle.component.stub';
import { ThemeServiceStub } from 'src/app/services/theme/theme.service.stub';
import { NotificationServiceStub } from 'src/app/services/notification/notification.service.stub';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;
  let themeService: ThemeService;
  let notificationService: NotificationService;

  const exampleResponse = {
    status: true,
    message: 'Success message.',
    data: {
      username: 'exampleUser',
      email: 'exampleEmail@mail.com',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        InputComponentStub,
        ButtonComponentStub,
        ToggleComponentStub,
      ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: ThemeService, useClass: ThemeServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
      ],
      imports: [
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    userService = TestBed.inject(UserService);
    themeService = TestBed.inject(ThemeService);
    notificationService = TestBed.inject(NotificationService);
    userService.getUserData = jasmine.createSpy().and.returnValue(of(exampleResponse));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    describe('#getTheme', () => {
      let getThemeSpy: jasmine.Spy;

      beforeEach(() => {
        component.currentTheme = 'Normal';
        getThemeSpy = spyOn(themeService, 'getTheme').and.returnValue('Dark');
        component.ngOnInit();
      });

      it('should be called', () => {
        expect(getThemeSpy).toHaveBeenCalledOnceWith();
      });

      it('should set the currentTheme to the received value', () => {
        expect(component.currentTheme).toEqual('Dark');
      });
    });

    describe('#getUserData', () => {
      let setNotificationSpy: jasmine.Spy;

      describe('and the return value has a status of false', () => {
        const exampleErrorResponse = {
          status: false,
          message: 'An error occurred while retrieving the profile data.',
          data: {
            username: 'exampleUser',
            email: 'exampleEmail@mail.com',
          },
        };

        beforeEach(() => {
          userService.getUserData = jasmine.createSpy().and.returnValue(of(exampleErrorResponse));
          setNotificationSpy = spyOn(notificationService, 'setNotification');
          component.ngOnInit();
        });

        it('should be called', () => {
          expect(userService.getUserData).toHaveBeenCalledOnceWith();
        });

        it('should call the notification service with the received error message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: exampleErrorResponse.message });
        });
      });

      describe('and the return value has a status of true', () => {
        beforeEach(() => {
          component.dataForm.setValue({
            username: '',
            email: '',
          });
          userService.getUserData = jasmine.createSpy().and.returnValue(of(exampleResponse));
          component.ngOnInit();
        });

        it('should be called', () => {
          expect(userService.getUserData).toHaveBeenCalledOnceWith();
        });

        it('should set the dataForm vlaues to the received ones', () => {
          expect(component.dataForm.getRawValue()).toEqual(exampleResponse.data);
        });
      });
    });
  });

  describe('#toggleTheme', () => {
    let setThemeSpy: jasmine.Spy<(theme: 'Dark' | 'Normal') => void>;

    beforeEach(() => {
      setThemeSpy = spyOn(themeService, 'setTheme');
    });

    describe('and the value is "Dark"', () => {
      const expectedValue = 'Dark';

      beforeEach(() => {
        component.toggleTheme(expectedValue);
      });

      it('should call #setTheme from the theme service with "Dark"', () => {
        expect(setThemeSpy).toHaveBeenCalledOnceWith(expectedValue);
      });

      it('should set the currentTheme to the received value', () => {
        expect(component.currentTheme).toEqual(expectedValue);
      });
    });

    describe('and the value is "Normal"', () => {
      const expectedValue = 'Normal';

      beforeEach(() => {
        component.toggleTheme(expectedValue);
      });

      it('should call #setTheme from the theme service with "Normal"', () => {
        expect(setThemeSpy).toHaveBeenCalledOnceWith(expectedValue);
      });

      it('should set the currentTheme to the received value', () => {
        expect(component.currentTheme).toEqual(expectedValue);
      });
    });
  });

  describe('#onDataSubmit', () => {
    let userDataChangeSpy: jasmine.Spy;
    let setNotificationSpy: jasmine.Spy;

    beforeEach(() => {
      userDataChangeSpy = spyOn(userService, 'userDataChange');
      setNotificationSpy = spyOn(notificationService, 'setNotification');
    });

    describe('and the form is invalid', () => {
      beforeEach(() => {
        component.dataForm = new FormGroup({
          username: new FormControl('', { nonNullable: true, validators: [Validators.minLength(1)] }),
          email: new FormControl('123', { nonNullable: true, validators: [Validators.maxLength(1)] }),
        });
        component.onDataSubmit();
      });

      it('should call the notification service with the received error message', () => {
        expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'The form is invalid.' });
      });
    });

    describe('and the form is valid', () => {
      beforeEach(() => {
        component.dataForm = new FormGroup({
          username: new FormControl('exampleUsername', { nonNullable: true }),
          email: new FormControl('example@mail.com', { nonNullable: true }),
        });
      });

      describe('and the user service returns data with a status of false', () => {
        const exampleResponse = {
          status: false,
          message: 'Example error message',
        };

        beforeEach(() => {
          userDataChangeSpy.and.returnValue(of(exampleResponse));
          component.onDataSubmit();
        });

        it('should call the notification service with the received error message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: exampleResponse.message });
        });
      });

      describe('and the user service returns data with a status of true', () => {
        const exampleResponse = {
          status: true,
          message: 'Successfully registered.',
          type: 'success',
        };

        beforeEach(() => {
          userDataChangeSpy.and.returnValue(of(exampleResponse));
          component.onDataSubmit();
        });

        it('should call the notification service with a success message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({
            type: 'success',
            message: 'Changed data successfully.',
          });
        });
      });

      describe('and the user service throws an error', () => {
        beforeEach(() => {
          userDataChangeSpy.and.returnValue(throwError(() => new Error('Error message.')));
          component.onDataSubmit();
        });

        it('should call the notification service with a generic error message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'An error occurred.' });
        });
      });
    });
  });

  describe('#onPasswordSubmit', () => {
    let userPasswordChangeSpy: jasmine.Spy;
    let setNotificationSpy: jasmine.Spy;

    beforeEach(() => {
      userPasswordChangeSpy = spyOn(userService, 'userPasswordChange');
      setNotificationSpy = spyOn(notificationService, 'setNotification');
    });

    describe('and the form is invalid', () => {
      beforeEach(() => {
        component.passwordForm = new FormGroup({
          password: new FormControl('', { nonNullable: true, validators: [Validators.minLength(1)] }),
          repassword: new FormControl('123', { nonNullable: true, validators: [Validators.maxLength(1)] }),
        });
        component.onPasswordSubmit();
      });

      it('should call the notification service with the received error message', () => {
        expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'The form is invalid.' });
      });
    });

    describe('and the form is valid', () => {
      beforeEach(() => {
        component.passwordForm = new FormGroup({
          password: new FormControl('exampleUsername', { nonNullable: true }),
          repassword: new FormControl('example@mail.com', { nonNullable: true }),
        });
      });

      describe('and the user service returns data with a status of false', () => {
        const exampleResponse = {
          status: false,
          message: 'Example error message',
        };

        beforeEach(() => {
          userPasswordChangeSpy.and.returnValue(of(exampleResponse));
          component.onPasswordSubmit();
        });

        it('should call the notification service with the received error message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: exampleResponse.message });
        });
      });

      describe('and the user service returns data with a status of true', () => {
        const exampleResponse = {
          status: true,
          message: 'Successfully registered.',
          type: 'success',
        };

        beforeEach(() => {
          userPasswordChangeSpy.and.returnValue(of(exampleResponse));
          component.onPasswordSubmit();
        });

        it('should call the notification service with a success message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({
            type: 'success',
            message: 'Changed password successfully.',
          });
        });
      });

      describe('and the user service throws an error', () => {
        beforeEach(() => {
          userPasswordChangeSpy.and.returnValue(throwError(() => new Error('Error message.')));
          component.onPasswordSubmit();
        });

        it('should call the notification service with a generic error message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'An error occurred.' });
        });
      });
    });
  });
});
