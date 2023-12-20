import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  template: '',
})
export class ToggleComponentStub {
  @Input() currentValue: string = '';
  @Input() options?: {
    toggleHeader: string,
    leftOption: string,
    rightOption: string,
  };
}
