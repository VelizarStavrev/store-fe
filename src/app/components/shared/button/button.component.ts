import { Component, OnInit, Input } from '@angular/core';
import { ButtonOptions } from 'src/app/interfaces/button-options';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() buttonText = 'Click';
  @Input() buttonType = 'primary';
  @Input() buttonHTMLType = 'button';
  @Input() buttonMarginTop = false;
  @Input() buttonMarginBottom = false;
  @Input() buttonMarginLeft = false;
  @Input() buttonMarginRight = false;
  @Input() buttonDisabled = false;
  @Input() buttonWidthFull = false;
  @Input() buttonOptions?: ButtonOptions;
  @Input() isLoading = false;
  buttonClasses: string[] = ['button-base'];

  ngOnInit(): void {
    this.setOptions();
    this.setClasses();
  }

  setOptions(): void {
    if (this.buttonOptions) {
      Object.entries(this.buttonOptions).forEach(
        ([key, value]) => (this[key as keyof ButtonComponent] as ButtonComponent) = value,
      );
    }
  }

  setClasses(): void {
    switch (this.buttonType) {
      case 'primary':
        this.buttonClasses.push('button-primary');
        break;

      case 'secondary':
        this.buttonClasses.push('button-secondary');
        break;

      case 'transparent':
        this.buttonClasses.push('button-transparent');
        break;

      default:
        this.buttonClasses.push('button-primary');
    }

    if (this.buttonMarginTop) {
      this.buttonClasses.push('button-margin-top');
    }

    if (this.buttonMarginBottom) {
      this.buttonClasses.push('button-margin-bottom');
    }

    if (this.buttonMarginLeft) {
      this.buttonClasses.push('button-margin-left');
    }

    if (this.buttonMarginRight) {
      this.buttonClasses.push('button-margin-right');
    }

    if (this.buttonWidthFull) {
      this.buttonClasses.push('button-width-full');
    }
  }
}
