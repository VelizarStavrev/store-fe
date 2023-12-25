import { Component } from '@angular/core';
import { ButtonLinkOptions } from 'src/app/interfaces/button-link-options';
import { ButtonOptions } from 'src/app/interfaces/button-options';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent {
  submitButtonOptions: ButtonOptions = {
    buttonText: 'Reset',
    buttonType: 'primary',
    buttonHTMLType: 'submit',
    buttonMarginTop: true,
    buttonWidthFull: true,
  };

  loginButtonOptions: ButtonLinkOptions = {
    buttonText: 'Login',
    buttonType: 'transparent',
    buttonLink: '/login',
    buttonMarginTop: true,
    buttonWidthFull: true,
  };

  email = '';
}
