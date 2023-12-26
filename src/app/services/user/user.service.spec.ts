import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { NotificationService } from '../notification/notification.service';
import { UserService } from './user.service';

// Stubs
import { NotificationServiceStub } from '../notification/notification.service.stub';
import { Subscription } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;
  let router: Router;
  let notificationService: NotificationService;
  const serverURL = 'server/user';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: NotificationService, useClass: NotificationServiceStub },
      ],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    notificationService = TestBed.inject(NotificationService);
    service.userURL = serverURL;
    localStorage.removeItem('token');
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#userRegister', () => {
    const exampleData = {
      email: 'example@mail',
      username: 'exampleuname',
      password: '123123',
      repassword: '123123',
    };
    const exampleResponse = {
      status: true,
      message: 'Success!',
      type: '123',
    };

    beforeEach(() => {
      service.userRegister(exampleData).subscribe((postData) => {
        expect(postData).toEqual(exampleResponse);
      });
    });

    it('should send a request to the server', () => {
      const req = http.expectOne(`${serverURL}/register`);
      expect(req.request.method).toBe('POST');
      req.flush(exampleResponse);
    });
  });

  describe('#userLogin', () => {
    const exampleResponse = {
      status: true,
      message: 'Success!',
      token: '123',
    }

    beforeEach(() => {
      service.userLogin('exampleuname', '123123').subscribe((postData) => {
        expect(postData).toEqual(exampleResponse);
      });
    });

    it('should send a request to the server', () => {
      const req = http.expectOne(`${serverURL}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(exampleResponse);
    });
  });

  describe('#userDataChange', () => {
    const exampleData = {
      email: 'example@mail',
      username: 'exampleuname',
    };
    const exampleResponse = {
      status: true,
      message: 'Success!',
    };

    beforeEach(() => {
      service.userDataChange(exampleData).subscribe((postData) => {
        expect(postData).toEqual(exampleResponse);
      });
    });

    it('should send a request to the server', () => {
      const req = http.expectOne(`${serverURL}/change/data`);
      expect(req.request.method).toBe('POST');
      req.flush(exampleResponse);
    });
  });

  describe('#userPasswordChange', () => {
    const exampleData = {
      password: 'examplepassword',
      repassword: 'examplepassword',
    };
    const exampleResponse = {
      status: true,
      message: 'Success!',
    };

    beforeEach(() => {
      service.userPasswordChange(exampleData).subscribe((postData) => {
        expect(postData).toEqual(exampleResponse);
      });
    });

    it('should send a request to the server', () => {
      const req = http.expectOne(`${serverURL}/change/password`);
      expect(req.request.method).toBe('POST');
      req.flush(exampleResponse);
    });
  });

  describe('#getUserData', () => {
    const exampleResponse = {
      status: true,
      message: 'Success!',
      data: {
        email: 'example@mail',
        username: 'exampleuname',
      },
    };

    beforeEach(() => {
      service.getUserData().subscribe((data) => {
        expect(data).toEqual(exampleResponse);
      });
    });

    it('should send a request to the server', () => {
      const req = http.expectOne(`${serverURL}/data`);
      expect(req.request.method).toBe('GET');
      req.flush(exampleResponse);
    });
  });

  describe('#userLogout', () => {
    let setUserLoggedInSpy: jasmine.Spy;
    let setUsernameSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;
    let setNotificationSpy: jasmine.Spy;
    let localStorageToken;

    beforeEach(() => {
      setUserLoggedInSpy = spyOn(service, 'setUserLoggedIn');
      setUsernameSpy = spyOn(service, 'setUsername');
      navigateSpy = spyOn(router, 'navigate');
      setNotificationSpy = spyOn(notificationService, 'setNotification');
      localStorageToken = null;

      localStorage.setItem('token', 'fakeTokenValue');
      service.userLogout();
    });

    it('should remove the localStorage token', () => {
      localStorageToken = localStorage.getItem('token');
      expect(localStorageToken).toBeNull();
    });

    it('should call #setUserLoggedIn', () => {
      expect(setUserLoggedInSpy).toHaveBeenCalled();
    });

    it('should call #setUsername', () => {
      expect(setUsernameSpy).toHaveBeenCalled();
    });

    it('should redirect the user', () => {
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });

    it('should show a success notification', () => {
      expect(setNotificationSpy).toHaveBeenCalledWith({ type: 'success', message: 'Successfully logged out.' });
    });
  });

  describe('#setUserLoggedIn', () => {
    let expectedObservableValue: boolean;
    let isUserLoggedInSubscription: Subscription;

    beforeEach(() => {
      localStorage.removeItem('token');
      expectedObservableValue = false;
      service.setUserLoggedIn();

      isUserLoggedInSubscription = service.isUserLoggedIn.subscribe((value) => {
        expect(value).toEqual(expectedObservableValue);
      });
    });

    it('should trigger isUserLoggedIn value change', () => {
      localStorage.setItem('token', 'fakeTokenValue');
      expectedObservableValue = true;
      service.setUserLoggedIn();

      localStorage.removeItem('token');
      expectedObservableValue = false;
      service.setUserLoggedIn();
    });

    afterEach(() => {
      isUserLoggedInSubscription.unsubscribe();
    });
  });

  describe('#getUserToken', () => {
    let localStorageToken: string | null;

    describe('and there is a token', () => {
      beforeEach(() => {
        localStorage.setItem('token', 'fakeTokenValue');
        localStorageToken = service.getUserToken();
      });

      it('should return the token string', () => {
        expect(localStorageToken).toBeTruthy();
      });
    });

    describe('and there is no token', () => {
      beforeEach(() => {
        localStorage.removeItem('token');
        localStorageToken = service.getUserToken();
      });

      it('should return null', () => {
        expect(localStorageToken).toBeNull();
      });
    });
  });
});
