import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#openProfileMenu', () => {
    beforeEach(() => {
      component.isProfileMenuActive = false;
      component.openProfileMenu();
    });

    it('should set isProfileMenuActive to true', () => {
      expect(component.isProfileMenuActive).toBeTrue();
    });
  });

  describe('#openCartMenu', () => {
    beforeEach(() => {
      component.isCartMenuActive = false;
      component.openCartMenu();
    });

    it('should set isCartMenuActive to true', () => {
      expect(component.isCartMenuActive).toBeTrue();
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
