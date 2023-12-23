import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification } from 'src/app/interfaces/notification';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  currentNotifications: Notification[] = [];
  _notificationSubscription?: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this._notificationSubscription = this.notificationService.notificationObservable.subscribe((value) => {
      this.currentNotifications = value;
    });
  }

  ngOnDestroy(): void {
    this._notificationSubscription?.unsubscribe();
  }

  removeNotification(index: number): void {
    this.currentNotifications.splice(index, 1);
  }
}
