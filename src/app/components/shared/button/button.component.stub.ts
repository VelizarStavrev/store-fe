import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: '',
})
export class ButtonComponentStub {
  @Input() buttonOptions: any;
  @Input() isLoading: any;
  @Input() buttonDisabled: any;
}
