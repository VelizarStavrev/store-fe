import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent,
      ],
      imports: [
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    const fn = () => {
      // Example empty function
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn2 = (test: string) => {
      // Example empty function
      // Having params makes it a different function for comparison
    };

    it('#onTouched should not do anything and be empty by default', () => {
      const result = component.onTouched(null);
      expect(result).toBeFalsy();
    });

    describe('#writeValue', () => {
      const expectedValue = 'test value';

      beforeEach(() => {
        component.formControl.setValue('');
        component.writeValue(expectedValue);
      });

      it('should set the formControl value', () => {
        expect(component.formControl.value).toEqual(expectedValue);
      });
    });

    describe('#registerOnChange', () => {
      beforeEach(() => {
        component._changeSubscriptions = [];
      });

      it('should add the formControl valueChanges subscription to the subscriptions array', () => {
        component.registerOnChange(fn);
        expect(component._changeSubscriptions.length).toEqual(1);

        component.registerOnChange(fn2);
        expect(component._changeSubscriptions.length).toEqual(2);
      });
    });

    describe('#registerOnTouched', () => {
      it('should set the onTouched function', () => {
        component.registerOnTouched(fn);
        expect(component.onTouched).toEqual((fn));
        expect(component.onTouched).not.toEqual((fn2));

        component.registerOnTouched(fn2);
        expect(component.onTouched).toEqual((fn2));
        expect(component.onTouched).not.toEqual((fn));
      });
    });
  });
});
