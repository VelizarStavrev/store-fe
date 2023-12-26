import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';

// Components
import { ContactComponent } from './contact.component';

// Services
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

// Stubs
import { UserServiceStub } from 'src/app/services/user/user.service.stub';
import { InputComponentStub } from '../shared/input/input.component.stub';
import { ButtonComponentStub } from '../shared/button/button.component.stub';
import { NotificationServiceStub } from 'src/app/services/notification/notification.service.stub';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let userService: UserService;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactComponent,
        InputComponentStub,
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
    fixture = TestBed.createComponent(ContactComponent);
    userService = TestBed.inject(UserService);
    notificationService = TestBed.inject(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSubmit', () => {
    let userContactSpy: jasmine.Spy;
    let setNotificationSpy: jasmine.Spy;

    beforeEach(() => {
      userContactSpy = spyOn(userService, 'userContact');
      setNotificationSpy = spyOn(notificationService, 'setNotification');
    });

    describe('and the form is invalid', () => {
      beforeEach(() => {
        component.contactForm = new FormGroup({
          email: new FormControl('123', { nonNullable: true, validators: [Validators.maxLength(1)] }),
          name: new FormControl('', { nonNullable: true, validators: [Validators.minLength(1)] }),
          message: new FormControl('', { nonNullable: true, validators: [Validators.minLength(1)] }),
        });
        component.onSubmit();
      });

      it('should call the notification service with the received error message', () => {
        expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'The form is invalid.' });
      });
    });

    describe('and the form is valid', () => {
      beforeEach(() => {
        component.contactForm = new FormGroup({
          email: new FormControl('example@mail.com', { nonNullable: true }),
          name: new FormControl('exampleUsername', { nonNullable: true }),
          message: new FormControl('Example message.', { nonNullable: true }),
        });
      });

      describe('and the user service returns data with a status of false', () => {
        const exampleResponse = {
          status: false,
          message: 'Example error message',
        };

        beforeEach(() => {
          userContactSpy.and.returnValue(of(exampleResponse));
          component.onSubmit();
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
          userContactSpy.and.returnValue(of(exampleResponse));
          component.onSubmit();
        });

        it('should call the notification service with a success message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({
            type: 'success',
            message: 'Message sent successfully.',
          });
        });
      });

      describe('and the user service throws an error', () => {
        beforeEach(() => {
          userContactSpy.and.returnValue(throwError(() => new Error('Error message.')));
          component.onSubmit();
        });

        it('should call the notification service with a generic error message', () => {
          expect(setNotificationSpy).toHaveBeenCalledOnceWith({ type: 'error', message: 'An error occurred.' });
        });
      });
    });
  });
});
