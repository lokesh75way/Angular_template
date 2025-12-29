import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);

  displayName = this.userService.displayName;
  userRole = this.userService.userRole;
  isLoggedIn = this.userService.isLoggedIn;

  showNotification() {
    this.notificationService.addNotification(
      `Welcome ${this.userService.currentUser()?.name}! 🎉`,
      'success'
    );
  }
}