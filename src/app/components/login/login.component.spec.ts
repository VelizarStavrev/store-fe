import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Components
import { LoginComponent } from './login.component';

// Services
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

// Stubs
import { UserServiceStub } from 'src/app/services/user/user.service.stub';
import { ButtonLinkComponentStub } from '../shared/button-link/button-link.component.stub';
import { ButtonComponentStub } from '../shared/button/button.component.stub';
import { InputComponentStub } from '../shared/input/input.component.stub';
import { NotificationServiceStub } from 'src/app/services/notification/notification.service.stub';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let userService: UserService;
  let notificationService: NotificationService;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        InputComponentStub,
        ButtonLinkComponentStub,
        ButtonComponentStub,
      ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
      ],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
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
    let userLoginSpy: jasmine.Spy;
    let setUserLoggedInSpy: jasmine.Spy;
    let setUsernameSpy: jasmine.Spy;
    let setNotificationSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      userLoginSpy = spyOn(userService, 'userLogin');
      setUserLoggedInSpy = spyOn(userService, 'setUserLoggedIn');
      setUsernameSpy = spyOn(userService, 'setUsername');
      setNotificationSpy = spyOn(notificationService, 'setNotification');
      navigateSpy = spyOn(router, 'navigate');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    });

    describe('and the user service returns data with a status of false', () => {
      const exampleResponse = {
        status: false,
        message: 'Example error message',
      };

      beforeEach(() => {
        userLoginSpy.and.returnValue(of(exampleResponse));
        component.onSubmit();
      });

      it('should call the notification service with the received error message', () => {
        expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: exampleResponse.message });
      });

      it('should not call anything else', () => {
        expect(setUserLoggedInSpy).not.toHaveBeenCalled();
        expect(setUsernameSpy).not.toHaveBeenCalled();
        expect(navigateSpy).not.toHaveBeenCalled();
      });
    });

    describe('and the user service returns data with a status of true', () => {
      const username = 'user123';
      const exampleResponse = {
        status: true,
        message: 'Successfully logged in.',
        token: 'fakeTokenValue',
      };

      beforeEach(() => {
        userLoginSpy.and.returnValue(of(exampleResponse));
        component.username = username;
        component.onSubmit();
      });

      it('should set the token to the local storage', () => {
        expect(localStorage.getItem('token')).toEqual(exampleResponse.token);
      });

      it('should set the username to the local storage', () => {
        expect(localStorage.getItem('username')).toEqual(username);
      });

      it('should call #setUserLoggedIn from the user service', () => {
        expect(setUserLoggedInSpy).toHaveBeenCalledOnceWith();
      });

      it('should call #setUsername from the user service', () => {
        expect(setUsernameSpy).toHaveBeenCalledOnceWith();
      });

      it('should navigate to the profile page', () => {
        expect(navigateSpy).toHaveBeenCalledWith(['/profile']);
      });

      it('should call the notification service with the received success message', () => {
        expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'success', message: exampleResponse.message });
      });
    });

    describe('and the user service throws an error', () => {
      beforeEach(() => {
        userLoginSpy.and.returnValue(throwError(() => new Error('Error message.')));
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
