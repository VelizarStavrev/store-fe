import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
      ],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The method ngOnInit is called when the component is created
  describe('#ngOnInit', () => {
    let valueChangeSpy: jasmine.Spy;

    beforeEach(() => {
      valueChangeSpy = jasmine.createSpy();
      component.valueChange.subscribe(valueChangeSpy);
    });

    describe('and valueChangeSubject is updated once', () => {
      beforeEach(fakeAsync(() => {
        component.valueChangeSubject.next('testValue');
        tick(500);
      }));

      it('should emit valueChange when valueChangeSubject is updated', () => {
        expect(valueChangeSpy).toHaveBeenCalledOnceWith('testValue');
      });
    });

    describe('and valueChangeSubject is updated with multiple values', () => {
      beforeEach(fakeAsync(() => {
        component.valueChangeSubject.next('testValue1');
        tick(100);
        component.valueChangeSubject.next('testValue2');
        tick(450);
        component.valueChangeSubject.next('testValue3');
        tick(550);
      }));
      
      it('should emit the last value of valueChange', () => {
        expect(valueChangeSpy).toHaveBeenCalledOnceWith('testValue3');
      });
    });
  });

  describe('#onValueChange', () => {
    let valueChangeSubjectSpy: jasmine.Spy;

    beforeEach(() => {
      valueChangeSubjectSpy = jasmine.createSpy();
      component.valueChangeSubject.subscribe(valueChangeSubjectSpy);
      component.onValueChange('testValue');
    });

    it('should update the valueChangeSubject', () => {
      expect(valueChangeSubjectSpy).toHaveBeenCalledOnceWith('testValue');
    });
  });
});
