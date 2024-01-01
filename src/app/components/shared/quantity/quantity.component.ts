import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent {
  currentValue = 1;
  @Output() valueChange = new EventEmitter<number>();

  decrementCurrentValue(): void {
    this.inputValueChanged(this.currentValue - 1 <= 0 ? this.currentValue = 0 : this.currentValue - 1);
  }

  incrementCurrentValue(): void {
    this.inputValueChanged(this.currentValue + 1);
  }

  inputValueChanged(value: number): void {
    this.currentValue = value;
    this.valueChange.emit(this.currentValue);
  }
}
