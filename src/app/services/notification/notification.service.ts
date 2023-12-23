import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from 'src/app/interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  currentNotifications: Notification[] = [];
  notificationObservable: Subject<Notification[]> = new Subject();

  setNotification(notificationData: Notification): void {
    this.currentNotifications.push(notificationData);
    this.notificationObservable.next(this.currentNotifications);
  }
}
