import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityComponent } from './quantity.component';
import { FormsModule } from '@angular/forms';

describe('QuantityComponent', () => {
  let component: QuantityComponent;
  let fixture: ComponentFixture<QuantityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuantityComponent,
      ],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(QuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#descrementCurrentValue', () => {
    let inputValueChanged: jasmine.Spy;

    beforeEach(() => {
      inputValueChanged = spyOn(component, 'inputValueChanged');
    });

    describe('and the value is going to be lower than zero when decremented', () => {
      beforeEach(() => {
        component.currentValue = -2;
        component.decrementCurrentValue();
      });

      it('should call #inputValueChanged with 0', () => {
        expect(inputValueChanged).toHaveBeenCalledOnceWith(0);
      });
    });

    describe('and the value is going to be higher than zero when decremented', () => {
      beforeEach(() => {
        component.currentValue = 5;
        component.decrementCurrentValue();
      });

      it('should call #inputValueChanged with the decremented value', () => {
        expect(inputValueChanged).toHaveBeenCalledOnceWith(4);
      });
    });
  });

  describe('#incrementCurrentValue', () => {
    let inputValueChanged: jasmine.Spy;

    beforeEach(() => {
      inputValueChanged = spyOn(component, 'inputValueChanged');
      component.currentValue = 5;
      component.incrementCurrentValue();
    });

    it('should call #inputValueChanged with the incremented value', () => {
      expect(inputValueChanged).toHaveBeenCalledOnceWith(6);
    });
  });

  describe('#inputValueChanged', () => {
    let valueChangeSpy: jasmine.Spy;

    beforeEach(() => {
      valueChangeSpy = jasmine.createSpy();
      component.valueChange.subscribe(valueChangeSpy);
      component.currentValue = 5;
      component.inputValueChanged(6);
    });

    it('should set the current value', () => {
      expect(component.currentValue).toEqual(6);
    });

    it('should emit the current value to valueChange', () => {
      expect(valueChangeSpy).toHaveBeenCalledOnceWith(6);
    });
  });
});
