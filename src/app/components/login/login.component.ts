import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

// Interfaces
import { ButtonOptions } from 'src/app/interfaces/button-options';
import { ButtonLinkOptions } from 'src/app/interfaces/button-link-options';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitButtonOptions: ButtonOptions = {
    buttonText: 'Login',
    buttonType: 'primary',
    buttonHTMLType: 'submit',
    buttonMarginTop: true,
    buttonWidthFull: true,
  };

  forgottenPasswordButtonOptions: ButtonLinkOptions = {
    buttonText: 'Forgotten password?',
    buttonType: 'link',
    buttonLink: '/reset',
  };

  registerButtonOptions: ButtonLinkOptions = {
    buttonText: 'Register',
    buttonType: 'transparent',
    buttonLink: '/register',
    buttonMarginTop: true,
    buttonWidthFull: true,
  };

  username = '';
  password = '';

  isLoading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService,
  ) { }

  onSubmit(): void {
    this.isLoading = true;

    this.userService.userLogin(this.username, this.password)
      .subscribe({
        next: (data) => {
          this.isLoading = false;

          if (!data.status) {
            this.notificationService.setNotification({ type: 'error', message: data.message });
            return;
          }

          localStorage.setItem('token', data.token);
          localStorage.setItem('username', this.username);
          this.userService.setUserLoggedIn();
          this.userService.setUsername();
          this.router.navigate(['/profile']);
          this.notificationService.setNotification({ type: 'success', message: 'Successfully logged in.' });
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.setNotification({ type: 'error', message: 'An error occurred.' });
        },
      });
  }
}
