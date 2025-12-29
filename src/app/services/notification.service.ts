// services/notification.service.ts
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationSubject.asObservable();
  notifications = signal<Notification[]>([]);

  addNotification(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date()
    };

    const current = this.notifications();
    this.notifications.set([...current, notification]);
    this.notificationSubject.next([...current, notification]);

    setTimeout(() => this.removeNotification(notification.id), 4000);
  }

  removeNotification(id: string) {
    const current = this.notifications();
    this.notifications.set(current.filter(n => n.id !== id));
    this.notificationSubject.next(current.filter(n => n.id !== id));
  }
}