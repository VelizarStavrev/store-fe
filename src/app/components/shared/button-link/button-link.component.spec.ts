import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonLinkComponent } from './button-link.component';
import { ButtonLinkOptions } from 'src/app/interfaces/button-link-options';

describe('ButtonLinkComponent', () => {
  let component: ButtonLinkComponent;
  let fixture: ComponentFixture<ButtonLinkComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ButtonLinkComponent],
      imports: [RouterTestingModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonLinkComponent);
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

    expect(component.buttonClasses).toEqual(['link-button', 'link-button-primary']);
    expect(component.buttonText).toEqual('Click');
    expect(component.buttonType).toEqual('primary');
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
        expect(component.buttonMarginBottom).toEqual(false);
        expect(component.buttonMarginLeft).toEqual(false);
        expect(component.buttonMarginRight).toEqual(false);
        expect(component.buttonMarginTop).toEqual(false);
        expect(component.buttonWidthFull).toEqual(false);
      });
    });

    describe('and there are button options', () => {
      const expectedOptions: ButtonLinkOptions = {
        buttonText: 'Button text',
        buttonType: 'secondary',
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
          const optionKey = option as keyof ButtonLinkOptions;
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

    expect(component.buttonClasses).toEqual(['link-button', 'link-button-secondary']);
  });

  it('buttonClasses should set transparent', () => {
    component.buttonType = 'transparent';
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-button', 'link-button-transparent']);
  });

  it('buttonClasses should set plain', () => {
    component.buttonType = 'link';
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-plain']);
  });

  it('buttonClasses should set plain if no case is found', () => {
    component.buttonType = 'NonExistingCase';
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-plain']);
  });

  it('buttonClasses should set margin classes', () => {
    component.buttonMarginTop = true;
    component.buttonMarginBottom = true;
    component.buttonMarginLeft = true;
    component.buttonMarginRight = true;

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual([
      'link-button',
      'link-button-primary',
      'button-margin-top',
      'button-margin-bottom',
      'button-margin-left',
      'button-margin-right',
    ]);
  });

  it('buttonClasses should set the button width full class', () => {
    component.buttonWidthFull = true;
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-button', 'link-button-primary', 'button-width-full']);
  });
});
