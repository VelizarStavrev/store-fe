import { TestBed } from '@angular/core/testing';
import { Notification } from 'src/app/interfaces/notification';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let firstNotification: Notification;
  let secondNotification: Notification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
    firstNotification = { type: 'success', message: 'Example notification!' };
    secondNotification = { type: 'error', message: 'Example notification 2!' };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#setNotification should set the currentNotifications value', () => {
    expect(service.currentNotifications).toEqual([]);

    service.setNotification(firstNotification);
    expect(service.currentNotifications).toEqual([firstNotification]);

    service.setNotification(secondNotification);
    expect(service.currentNotifications).toEqual([firstNotification, secondNotification]);
  });

  describe('#notificationObservable', () => {
    let expectedNotificationObservable: Notification[];

    beforeEach(() => {
      service.notificationObservable.subscribe((value) => {
        expect(value).toEqual(expectedNotificationObservable);
      });
    });

    it('should be triggered on value change', () => {
      expectedNotificationObservable = [firstNotification];
      service.setNotification(firstNotification);

      expectedNotificationObservable = [firstNotification, secondNotification];
      service.setNotification(secondNotification);
    });
  });
});
