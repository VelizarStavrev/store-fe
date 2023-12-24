import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { MenuSettingsComponent } from './menu-settings.component';

// Services
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UserService } from 'src/app/services/user/user.service';

// Stubs
import { ToggleComponentStub } from '../../toggle/toggle.component.stub';
import { ThemeServiceStub } from 'src/app/services/theme/theme.service.stub';
import { ButtonLinkComponentStub } from '../../button-link/button-link.component.stub';
import { ButtonComponentStub } from '../../button/button.component.stub';
import { UserServiceStub } from 'src/app/services/user/user.service.stub';

describe('MenuSettingsComponent', () => {
  let component: MenuSettingsComponent;
  let fixture: ComponentFixture<MenuSettingsComponent>;
  let themeService: ThemeService;
  let userService: UserService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuSettingsComponent,
        ToggleComponentStub,
        ButtonLinkComponentStub,
        ButtonComponentStub,
      ],
      providers: [
        { provide: ThemeService, useClass: ThemeServiceStub },
        { provide: UserService, useClass: UserServiceStub },
      ],
    });
    fixture = TestBed.createComponent(MenuSettingsComponent);
    themeService = TestBed.inject(ThemeService);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      component.isUserLoggedIn = false;
      component.ngOnInit();
    });

    it('should subscribe to isUserLoggedIn changes', () => {
      userService.isUserLoggedIn.next(true);
      expect(component.isUserLoggedIn).toBeTrue();

      userService.isUserLoggedIn.next(false);
      expect(component.isUserLoggedIn).toBeFalse();
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
    });

    describe('and the value is "Normal"', () => {
      const expectedValue = 'Normal';

      beforeEach(() => {
        component.toggleTheme(expectedValue);
      });
      
      it('should call #setTheme from the theme service with "Normal"', () => {
        expect(setThemeSpy).toHaveBeenCalledOnceWith(expectedValue);
      });
    });
  });

  describe('#userLogout', () => {
    let userLogoutSpy: jasmine.Spy<() => void>;

    beforeEach(() => {
      userLogoutSpy = spyOn(userService, 'userLogout');
      component.userLogout();
    });

    it('should call #userLogout from the user service', () => {
      expect(userLogoutSpy).toHaveBeenCalledOnceWith();
    });
  });
});
