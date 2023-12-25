import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponentStub,
    },
  ],
})
export class InputComponentStub implements ControlValueAccessor {
  @Input() label: any;
  @Input() type: any;
  @Input() error: any;

  writeValue() { }
  registerOnChange() { }
  registerOnTouched() { }
}
