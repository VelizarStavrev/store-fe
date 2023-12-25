import { Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnDestroy {
  @Input() label = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() error: boolean | null = false;

  formControl = new FormControl();
  _changeSubscriptions: Subscription[] = [];
  
  onTouched: ControlValueAccessor['registerOnTouched'] = (): void => {
    // This code will be overwritten through registerOnTouched
  };

  writeValue(input: string) {
    this.formControl.setValue(input);
  }

  registerOnChange(fn: ControlValueAccessor['registerOnChange']): void {
    this._changeSubscriptions.push(
      this.formControl.valueChanges.subscribe(fn),
    );
  }

  registerOnTouched(fn: ControlValueAccessor['registerOnTouched']): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this._changeSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
