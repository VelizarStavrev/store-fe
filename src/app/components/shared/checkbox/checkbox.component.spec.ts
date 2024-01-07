import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        CheckboxComponent,
      ],
    });
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onValueChange', () => {
    let checkedChangeSpy: jasmine.Spy;

    beforeEach(() => {
      checkedChangeSpy = jasmine.createSpy();
      component.checkedChange.subscribe(checkedChangeSpy);
      component.checked = false;
      component.onValueChange(true);
    });

    it('should set checked to true', () => {
      expect(component.checked).toBeTrue();
    });

    it('should emit checkedChange with the value', () => {
      expect(checkedChangeSpy).toHaveBeenCalledOnceWith(true);
    });
  });
});
