import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NotificationComponent } from './notification.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let de: DebugElement;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationComponent,
      ],
      providers: [
        NotificationService,
      ],
    });
    fixture = TestBed.createComponent(NotificationComponent);
    notificationService = TestBed.inject(NotificationService);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have any notifications by default', () => {
    expect(component.currentNotifications).toEqual([]);
  });

  describe('the notification service is triggered or a notification is removed', () => {
    const successMessageSelector = '.notification-container .success';
    const successMessageText = 'Example success message!';
    const errorMessageSelector = '.notification-container .error';
    const errorMessageText = 'Example error message!';
  
    function testNotification(type: 'success' | 'error', message: string, selector: string): void {
      notificationService.setNotification({ type, message });
      fixture.detectChanges();
      expect(de.query(By.css(selector))).toBeTruthy();
      expect(de.query(By.css(selector)).nativeNode.innerText).toEqual(message);
    }

    function clearNotification(index: number, selector: string): void {
      component.removeNotification(index);
      fixture.detectChanges();
      expect(de.query(By.css(selector))).toBeNull();
    }

    beforeEach(() => {
      expect(component.currentNotifications).toEqual([]);
      expect(de.query(By.css('.notification-container'))).toBeTruthy();
      expect(de.query(By.css(successMessageSelector))).toBeNull();
      expect(de.query(By.css(errorMessageSelector))).toBeNull();
    });

    it('should update the data', () => {
      testNotification('success', successMessageText, successMessageSelector);
      clearNotification(0, successMessageSelector);

      testNotification('error', errorMessageText, errorMessageSelector);
      clearNotification(0, errorMessageSelector);
    });
  });
});
