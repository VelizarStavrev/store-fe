import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { UserService } from 'src/app/services/user/user.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

// Interfaces
import { ButtonOptions } from 'src/app/interfaces/button-options';
import { Theme } from 'src/app/interfaces/theme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  submitButtonOptions: ButtonOptions = {
    buttonText: 'Save',
    buttonType: 'primary',
    buttonHTMLType: 'submit',
    buttonMarginTop: true,
    buttonWidthFull: true,
  };

  currentTheme: Theme = 'Normal';
  themeToggleOptions: {
    toggleHeader: string,
    leftOption: Theme,
    rightOption: Theme,
  } = {
      toggleHeader: 'Theme',
      leftOption: 'Normal',
      rightOption: 'Dark',
    };

  dataForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  passwordForm = new FormGroup({
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    repassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  get username() {
    return this.dataForm.get('username');
  }
  get email() {
    return this.dataForm.get('email');
  }
  get password() {
    return this.passwordForm.get('password');
  }
  get repassword() {
    return this.passwordForm.get('repassword');
  }

  isDataFormLoading = false;
  isPasswordFormLoading = false;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.currentTheme = this.themeService.getTheme();

    this.userService.getUserData().subscribe((response) => {
      if (!response.status) {
        this.notificationService.setNotification({
          type: 'error',
          message: 'An error occurred while retrieving the profile data.',
        });
        return;
      }

      this.dataForm.setValue(response.data);
    });
  }

  toggleTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
  }

  onDataSubmit() {
    if (this.dataForm.invalid) {
      this.notificationService.setNotification({ type: 'error', message: 'The form is invalid.' });
      return;
    }

    this.isDataFormLoading = true;

    this.userService.userDataChange(this.dataForm.getRawValue())
      .subscribe({
        next: (data) => {
          this.isDataFormLoading = false;

          if (!data.status) {
            this.notificationService.setNotification({ type: 'error', message: data.message });
            return;
          }

          this.notificationService.setNotification({ type: 'success', message: 'Changed data successfully.' });
        },
        error: () => {
          this.isDataFormLoading = false;
          this.notificationService.setNotification({ type: 'error', message: 'An error occurred.' });
        },
      });
  }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      this.notificationService.setNotification({ type: 'error', message: 'The form is invalid.' });
      return;
    }

    this.isPasswordFormLoading = true;

    this.userService.userPasswordChange(this.passwordForm.getRawValue())
      .subscribe({
        next: (data) => {
          this.isPasswordFormLoading = false;

          if (!data.status) {
            this.notificationService.setNotification({ type: 'error', message: data.message });
            return;
          }

          this.notificationService.setNotification({ type: 'success', message: 'Changed password successfully.' });
        },
        error: () => {
          this.isPasswordFormLoading = false;
          this.notificationService.setNotification({ type: 'error', message: 'An error occurred.' });
        },
      });
  }
}
