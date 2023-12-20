import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;
  
  const exampleOptions = {
    toggleHeader: 'ExampleToggleHeader',
    leftOption: 'ExampleLeftValue',
    rightOption: 'ExampleRightValue',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleComponent],
    });
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    describe('and the component has passed options and no current value', () => {
      beforeEach(() => {
        component.currentValue = '';
        component.options = {
          toggleHeader: 'ExampleToggleHeader',
          leftOption: 'ExampleLeftValue',
          rightOption: 'ExampleRightValue',
        };

        component.ngOnInit();
      });

      it('should set the current value as the left option', () => {
        expect(component.currentValue).toEqual('ExampleLeftValue');
      });
    });

    describe('and the component has passed options and a current value', () => {
      beforeEach(() => {
        component.currentValue = 'ExampleRightValue';
        component.options = exampleOptions;

        component.ngOnInit();
      });

      it('should not overwrite the current value with the left option', () => {
        expect(component.currentValue).toEqual('ExampleRightValue');
      });
    });

    describe('and the component no passed options and no current value', () => {
      beforeEach(() => {
        component.currentValue = '';
        component.options = undefined;

        component.ngOnInit();
      });

      it('should have no current value set', () => {
        expect(component.currentValue).toEqual('');
      });
    });
  });

  describe('#toggleValue', () => {
    let valueChangedSpy: jasmine.Spy<jasmine.Func>;

    beforeEach(() => {
      valueChangedSpy = jasmine.createSpy();
      component.valueChanged.subscribe(valueChangedSpy);
    });

    describe('and there are no options passed', () => {
      beforeEach(() => {
        component.currentValue = '';
        component.options = undefined;
        component.toggleValue();
      });

      it('should not change and emit the current value', () => {
        expect(component.currentValue).toEqual('');
        expect(valueChangedSpy).not.toHaveBeenCalled();
      });
    });

    describe('and there are options passed and no current value', () => {
      beforeEach(() => {
        component.currentValue = '';
        component.options = exampleOptions;
        component.toggleValue();
      });

      it('should change and emit the current value', () => {
        expect(component.currentValue).toEqual(exampleOptions.leftOption);
        expect(valueChangedSpy).toHaveBeenCalledOnceWith(exampleOptions.leftOption);
      });
    });

    describe('and there are options passed and a current value', () => {
      beforeEach(() => {
        component.currentValue = exampleOptions.leftOption;
        component.options = exampleOptions;
        component.toggleValue();
      });

      it('should change and emit the current value', () => {
        expect(component.currentValue).toEqual(exampleOptions.rightOption);
        expect(valueChangedSpy).toHaveBeenCalledOnceWith(exampleOptions.rightOption);
      });
    });
  });
});
