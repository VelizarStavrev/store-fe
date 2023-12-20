import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { Renderer2, RendererFactory2 } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    let rendererFactory: RendererFactory2;
    let createRendererSpy: jasmine.Spy<jasmine.Func>;

    beforeEach(() => {
      localStorage.removeItem('theme');

      createRendererSpy = jasmine.createSpy('createRenderer').and.returnValue(null);
      rendererFactory = {
        createRenderer: createRendererSpy,
      } as RendererFactory2;
    });

    it('should call #createRenderer', () => {
      new ThemeService(rendererFactory);
      expect(rendererFactory.createRenderer).toHaveBeenCalledOnceWith(null, null);
    });

    describe('and the theme is "Normal"', () => {
      let newThemeService: ThemeService;

      beforeEach(() => {
        localStorage.setItem('theme', 'Normal');

        spyOn(ThemeService.prototype, 'setTheme');
        newThemeService = new ThemeService(rendererFactory);
      });

      it('should call #setTheme with "Normal"', () => {
        expect(newThemeService.setTheme).toHaveBeenCalledOnceWith('Normal');
      });
    });

    describe('and the theme is "Dark"', () => {
      let newThemeService: ThemeService;

      beforeEach(() => {
        localStorage.setItem('theme', 'Dark');

        spyOn(ThemeService.prototype, 'setTheme');
        newThemeService = new ThemeService(rendererFactory);
      });

      it('should call #setTheme with "Dark"', () => {
        expect(newThemeService.setTheme).toHaveBeenCalledOnceWith('Dark');
      });
    });

    describe('and there is no theme set', () => {
      let newThemeService: ThemeService;

      beforeEach(() => {
        spyOn(ThemeService.prototype, 'setTheme');
        newThemeService = new ThemeService(rendererFactory);
      });

      it('should not call #setTheme', () => {
        expect(newThemeService.setTheme).not.toHaveBeenCalled();
      });
    });
  });

  describe('#setTheme', () => {
    let newThemeService: ThemeService;
    let renderer2Object: Renderer2;
    let rendererFactory: RendererFactory2;
    let createRendererSpy: jasmine.Spy<jasmine.Func>;

    beforeEach(() => {
      renderer2Object = {
        addClass: jasmine.createSpy('addClass').and.callFake(
          () => {
            return;
          },
        ) as Renderer2['addClass'],
        removeClass: jasmine.createSpy('removeClass').and.callFake(
          () => {
            return;
          },
        ) as Renderer2['removeClass'],
      } as Renderer2;
      createRendererSpy = jasmine.createSpy('createRenderer').and.returnValue(null);
      rendererFactory = {
        createRenderer: createRendererSpy.and.returnValue(renderer2Object),
      } as RendererFactory2;

      localStorage.removeItem('theme');
      newThemeService = new ThemeService(rendererFactory);
    });

    describe('and the theme is "Normal"', () => {
      beforeEach(() => {
        newThemeService.setTheme('Normal');
      });

      it('should call #addClass and #removeClass with normal and dark', () => {
        expect(renderer2Object.addClass).toHaveBeenCalledOnceWith(document.body, 'theme-normal');
        expect(renderer2Object.removeClass).toHaveBeenCalledOnceWith(document.body, 'theme-dark');
      });
    });

    describe('and the theme is "Dark"', () => {
      beforeEach(() => {
        newThemeService.setTheme('Dark');
      });

      it('should call #addClass and #removeClass with dark and normal', () => {
        expect(renderer2Object.addClass).toHaveBeenCalledOnceWith(document.body, 'theme-dark');
        expect(renderer2Object.removeClass).toHaveBeenCalledOnceWith(document.body, 'theme-normal');
      });
    });
  });

  describe('#getTheme', () => {
    let receivedTheme: 'Normal' | 'Dark';

    describe('and the theme is Dark', () => {
      const expectedTheme = 'Dark';

      beforeEach(() => {
        service.setTheme(expectedTheme);
        receivedTheme = service.getTheme();
      });

      it('should return "Dark"', () => {
        expect(receivedTheme).toEqual(expectedTheme);
      });
    });

    describe('and the theme is "Normal"', () => {
      const expectedTheme = 'Normal';

      beforeEach(() => {
        service.setTheme(expectedTheme);
        receivedTheme = service.getTheme();
      });

      it('should return "Normal"', () => {
        expect(receivedTheme).toEqual(expectedTheme);
      });
    });
  });
});
