import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MessageComponentStub } from './components/shared/message/message.component.stub';
import { HeaderComponentStub } from './components/shared/header/header.component.stub';
import { FooterComponentStub } from './components/shared/footer/footer.component.stub';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        MessageComponentStub,
        HeaderComponentStub,
        FooterComponentStub,
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have the message component', () => {
    expect(de.query(By.css('app-message'))).toBeTruthy();
  });

  it('should have the header component', () => {
    expect(de.query(By.css('app-header'))).toBeTruthy();
  });

  it('should have the footer component', () => {
    expect(de.query(By.css('app-footer'))).toBeTruthy();
  });

  it('should have the main container', () => {
    expect(de.query(By.css('main'))).toBeTruthy();
  });
});
