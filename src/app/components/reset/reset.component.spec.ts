import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetComponent } from './reset.component';
import { InputComponentStub } from '../shared/input/input.component.stub';
import { FormsModule } from '@angular/forms';
import { ButtonLinkComponentStub } from '../shared/button-link/button-link.component.stub';
import { ButtonComponentStub } from '../shared/button/button.component.stub';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetComponent,
        InputComponentStub,
        ButtonLinkComponentStub,
        ButtonComponentStub,
      ],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
