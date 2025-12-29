import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NotificationListComponent],
  template: `
    <app-navbar></app-navbar>
    <app-notification-list></app-notification-list>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 80px);
      background: #f9f9f9;
    }
  `]
})
export class AppComponent {
  title = 'Angular Structure';
}