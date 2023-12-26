import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonOptions } from 'src/app/interfaces/button-options';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  submitButtonOptions: ButtonOptions = {
    buttonText: 'Save',
    buttonType: 'primary',
    buttonHTMLType: 'submit',
    buttonMarginTop: true,
    buttonWidthFull: true,
  };

  contactForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }

  isLoading = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
  ) { }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.notificationService.setNotification({ type: 'error', message: 'The form is invalid.' });
      return;
    }

    this.isLoading = true;

    this.userService.userContact(this.contactForm.getRawValue())
      .subscribe({
        next: (data) => {
          this.isLoading = false;

          if (!data.status) {
            this.notificationService.setNotification({ type: 'error', message: data.message });
            return;
          }

          this.notificationService.setNotification({ type: 'success', message: 'Message sent successfully.' });
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.setNotification({ type: 'error', message: 'An error occurred.' });
        },
      });
  }
}
