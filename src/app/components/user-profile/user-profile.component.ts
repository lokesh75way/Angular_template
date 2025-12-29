import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  template: `
    <div class="profile-card" *ngIf="user(); else noUser">
      <h2 [appHighlight]="'#e3f2fd'" textColor="#1976d2">
        {{ displayName() }}
      </h2>
      <p><strong>Email:</strong> {{ user()!.email }}</p>
      <p><strong>Role:</strong> {{ user()!.role }}</p>
      <p *ngIf="isAdmin()"><em>Administrator Access Granted</em></p>
    </div>
    <ng-template #noUser>
      <p>No user logged in</p>
    </ng-template>
  `,
  styles: [`
    .profile-card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 20px 0;
    }
    h2 { margin-top: 0; }
  `]
})
export class UserProfileComponent {
  private userService = inject(UserService);
  
  user = this.userService.currentUser;
  displayName = this.userService.displayName;
  isAdmin = this.userService.isAdmin;
}