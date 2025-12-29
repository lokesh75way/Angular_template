import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  trackEvent(eventName: string, data?: any) {
    console.log(`Event: ${eventName}`, data);
  }

  trackPageView(pageName: string) {
    console.log(`Page View: ${pageName}`);
  }
}