import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  template: '',
})
export class InputComponentStub {
  @Input() label: any;
  @Input() type: any;
  @Input() error: any;
}
