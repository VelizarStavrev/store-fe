import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() label = '';
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onValueChange(value: boolean): void {
    this.checked = value;
    this.checkedChange.emit(value);
  }
}
