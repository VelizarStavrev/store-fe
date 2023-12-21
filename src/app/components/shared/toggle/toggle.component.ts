import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent<T = string> implements OnInit {
  @Input() currentValue?: T;
  @Input() options?: {
    toggleHeader: string,
    leftOption: T,
    rightOption: T,
  };

  @Output() valueChanged = new EventEmitter<T>();

  ngOnInit(): void {
    if (this.options && !this.currentValue) {
      this.currentValue = this.options.leftOption;
    }
  }

  toggleValue(): void {
    if (!this.options) {
      return;
    }

    const currentValue = this.currentValue === this.options.leftOption
      ? this.options.rightOption
      : this.options.leftOption;

    this.currentValue = currentValue;
    this.valueChanged.emit(currentValue);
  }
}
