import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { UserService } from 'src/app/services/user/user.service';
import { UserServiceStub } from 'src/app/services/user/user.service.stub';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
      ],
      imports: [
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#toggleProfileMenu', () => {
    beforeEach(() => {
      component.isProfileMenuActive = false;
      component.toggleProfileMenu();
    });

    it('should set isProfileMenuActive to true', () => {
      expect(component.isProfileMenuActive).toBeTrue();
    });

    describe('and the toggle function is called again', () => {
      beforeEach(() => {
        component.toggleProfileMenu();
      });

      it('should set isCartMenuActive to false', () => {
        expect(component.isProfileMenuActive).toBeFalse();
      });
    });
  });

  describe('#toggleCartMenu', () => {
    beforeEach(() => {
      component.isCartMenuActive = false;
      component.toggleCartMenu();
    });

    it('should set isCartMenuActive to true', () => {
      expect(component.isCartMenuActive).toBeTrue();
    });

    describe('and the toggle function is called again', () => {
      beforeEach(() => {
        component.toggleCartMenu();
      });

      it('should set isCartMenuActive to false', () => {
        expect(component.isCartMenuActive).toBeFalse();
      });
    });
  });

  describe('#closeMenu', () => {
    beforeEach(() => {
      component.isProfileMenuActive = true;
      component.isCartMenuActive = true;
      component.closeMenu();
    });

    it('should set isProfileMenuActive and isCartMenuActive to false', () => {
      expect(component.isProfileMenuActive).toBeFalse();
      expect(component.isCartMenuActive).toBeFalse();
    });
  });
});
