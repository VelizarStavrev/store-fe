import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { MenuSettingsComponent } from './menu-settings.component';

// Services
import { ThemeService } from 'src/app/services/theme/theme.service';

// Stubs
import { ToggleComponentStub } from '../../toggle/toggle.component.stub';
import { ThemeServiceStub } from 'src/app/services/theme/theme.service.stub';

describe('MenuSettingsComponent', () => {
  let component: MenuSettingsComponent;
  let fixture: ComponentFixture<MenuSettingsComponent>;
  let themeService: ThemeService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuSettingsComponent,
        ToggleComponentStub,
      ],
      providers: [
        { provide: ThemeService, useClass: ThemeServiceStub },
      ],
    });
    fixture = TestBed.createComponent(MenuSettingsComponent);
    themeService = TestBed.inject(ThemeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
