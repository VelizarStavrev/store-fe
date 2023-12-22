import { Component, OnInit, Input } from '@angular/core';
import { ButtonLinkOptions } from 'src/app/interfaces/button-link-options';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
})
export class ButtonLinkComponent implements OnInit {
  @Input() buttonText = 'Click';
  @Input() buttonType = 'primary';
  @Input() buttonLink = '';
  @Input() buttonMarginTop = false;
  @Input() buttonMarginBottom = false;
  @Input() buttonMarginLeft = false;
  @Input() buttonMarginRight = false;
  @Input() buttonWidthFull = false;
  @Input() buttonOptions?: ButtonLinkOptions;
  buttonClasses: string[] = [];

  ngOnInit(): void {
    this.setOptions();
    this.setClasses();
  }

  setOptions(): void {
    if (this.buttonOptions) {
      Object.entries(this.buttonOptions).forEach(
        ([key, value]) => (this[key as keyof ButtonLinkComponent] as ButtonLinkComponent) = value,
      );
    }
  }

  setClasses(): void {
    switch (this.buttonType) {
      case 'primary':
        this.buttonClasses.push('link-button', 'link-button-primary');
        break;

      case 'secondary':
        this.buttonClasses.push('link-button', 'link-button-secondary');
        break;

      case 'transparent':
        this.buttonClasses.push('link-button', 'link-button-transparent');
        break;

      case 'link':
        this.buttonClasses.push('link-plain');
        break;

      default:
        this.buttonClasses.push('link-plain');
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
