import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { ButtonOptions } from 'src/app/interfaces/button-options';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    let setOptionsSpy: jasmine.Spy;
    let setClassesSpy: jasmine.Spy;

    beforeEach(() => {
      setOptionsSpy = spyOn(component, 'setOptions');
      setClassesSpy = spyOn(component, 'setClasses');
      component.ngOnInit();
    });

    it('calls #setOptions and #setClasses', () => {
      expect(setOptionsSpy).toHaveBeenCalledOnceWith();
      expect(setClassesSpy).toHaveBeenCalledOnceWith();
    });
  });

  it('should have the default params', () => {
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-primary']);
    expect(component.buttonText).toEqual('Click');
    expect(component.buttonType).toEqual('primary');
    expect(component.buttonHTMLType).toEqual('button');
    expect(component.buttonDisabled).toEqual(false);
    expect(component.buttonMarginBottom).toEqual(false);
    expect(component.buttonMarginLeft).toEqual(false);
    expect(component.buttonMarginRight).toEqual(false);
    expect(component.buttonMarginTop).toEqual(false);
    expect(component.buttonWidthFull).toEqual(false);
  });

  describe('#setOptions', () => {
    describe('and there are no button options', () => {
      beforeEach(() => {
        component.buttonOptions = undefined;
        component.setOptions();
      });

      it('should have the default params', () => {
        expect(component.buttonText).toEqual('Click');
        expect(component.buttonType).toEqual('primary');
        expect(component.buttonHTMLType).toEqual('button');
        expect(component.buttonDisabled).toEqual(false);
        expect(component.buttonMarginBottom).toEqual(false);
        expect(component.buttonMarginLeft).toEqual(false);
        expect(component.buttonMarginRight).toEqual(false);
        expect(component.buttonMarginTop).toEqual(false);
        expect(component.buttonWidthFull).toEqual(false);
      });
    });

    describe('and there are button options', () => {
      const expectedOptions: ButtonOptions = {
        buttonText: 'Button text',
        buttonType: 'secondary',
        buttonHTMLType: 'submit',
        buttonDisabled: true,
        buttonMarginBottom: true,
        buttonMarginLeft: true,
        buttonMarginRight: true,
        buttonMarginTop: true,
        buttonWidthFull: true,
      };

      beforeEach(() => {
        component.buttonOptions = expectedOptions;
        component.setOptions();
      });

      it('should have the default params', () => {
        for (const option in expectedOptions) {
          const optionKey = option as keyof ButtonOptions;
          const expectedValue = expectedOptions[optionKey];

          if (!expectedValue) throw new Error('expectedValue is undefined.')

          expect(component[optionKey]).toEqual(expectedValue);
        }
      });
    });
  });

  it('buttonClasses should set secondary', () => {
    component.buttonType = 'secondary';
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-secondary']);
  });

  it('buttonClasses should set transparent', () => {
    component.buttonType = 'transparent';
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-transparent']);
  });

  it('buttonClasses should set primary if no case is found', () => {
    component.buttonType = 'NonExistingCase';
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-primary']);
  });

  it('buttonClasses should set margin classes', () => {
    component.buttonMarginTop = true;
    component.buttonMarginBottom = true;
    component.buttonMarginLeft = true;
    component.buttonMarginRight = true;

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual([
      'button-base',
      'button-primary',
      'button-margin-top',
      'button-margin-bottom',
      'button-margin-left',
      'button-margin-right',
    ]);
  });

  it('buttonClasses should set the button width full class', () => {
    component.buttonWidthFull = true;
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-primary', 'button-width-full']);
  });
});
