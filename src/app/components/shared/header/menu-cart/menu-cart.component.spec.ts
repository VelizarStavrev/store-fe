import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCartComponent } from './menu-cart.component';

describe('MenuCartComponent', () => {
  let component: MenuCartComponent;
  let fixture: ComponentFixture<MenuCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCartComponent],
    });
    fixture = TestBed.createComponent(MenuCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
