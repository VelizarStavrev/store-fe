import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

// Interfaces
import { ButtonOptions } from 'src/app/interfaces/button-options';
import { ButtonLinkOptions } from 'src/app/interfaces/button-link-options';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  submitButtonOptions: ButtonOptions = {
    buttonText: 'Register',
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

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    repassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get repassword() {
    return this.registerForm.get('repassword');
  }

  usernameExistsError = false;
  emailExistsError = false;
  isLoading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService,
  ) { }

  onSubmit() {
    this.usernameExistsError = false;
    this.emailExistsError = false;

    if (this.registerForm.invalid) {
      this.notificationService.setNotification({ type: 'error', message: 'The form is invalid.' });
      return;
    }

    this.isLoading = true;

    this.userService.userRegister(this.registerForm.getRawValue())
      .subscribe({
        next: (data) => {
          this.isLoading = false;

          if (!data.status) {
            switch (data.type) {
              case 'exists-email':
                this.emailExistsError = true;
                break;

              case 'exists-username':
                this.usernameExistsError = true;
                break;
            }

            this.notificationService.setNotification({ type: 'error', message: 'An error occured.' });
            return;
          }

          this.router.navigate(['/login']);
          this.notificationService.setNotification({ type: 'success', message: 'Successfully registered.' });
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.setNotification({ type: 'error', message: 'An error occurred.' });
        },
      });
  }
}
