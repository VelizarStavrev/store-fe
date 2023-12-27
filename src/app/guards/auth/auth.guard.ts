import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

export const authGuard: CanActivateFn = () => {
  const userToken = inject(UserService).getUserToken();

  if (userToken) {
    return true;
  }

  inject(NotificationService).setNotification({
    type: 'error',
    message: 'You need to be logged in to access this page.',
  });
  inject(Router).navigate(['/login']);
  return false;
};
