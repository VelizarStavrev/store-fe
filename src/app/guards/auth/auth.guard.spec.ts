import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';
import { UserService } from 'src/app/services/user/user.service';
import { UserServiceStub } from 'src/app/services/user/user.service.stub';
import { RouterTestingModule } from '@angular/router/testing';

describe('authGuard', () => {
  let router: Router;
  let userService: UserService;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterTestingModule,
        { provide: UserService, useClass: UserServiceStub },
      ],
    });

    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('#CanActivate', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    let canActivateReturnValue: boolean;
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      navigateSpy = spyOn(router, 'navigate');
    });

    describe('and the user service returns a token', () => {
      beforeEach(() => {
        spyOn(userService, 'getUserToken').and.returnValue('ExampleToken');
        canActivateReturnValue = executeGuard(route, state) as boolean;
      });

      it('should not redirect to the login page', () => {
        expect(navigateSpy).not.toHaveBeenCalled();
      });

      it('should return true', () => {
        expect(canActivateReturnValue).toBeTrue();
      });
    });

    describe('and the user service does not return a token', () => {
      beforeEach(() => {
        spyOn(userService, 'getUserToken').and.returnValue(null);
        canActivateReturnValue = executeGuard(route, state) as boolean;
      });

      it('should redirect to the login page', () => {
        expect(navigateSpy).toHaveBeenCalledOnceWith(['/login']);
      });

      it('should return false', () => {
        expect(canActivateReturnValue).toBeFalse();
      });
    });
  });
});
