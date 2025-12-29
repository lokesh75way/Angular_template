import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { StatusBadgePipe } from '../../pipes/status-badge.pipe';
import { LoadingDirective } from '../../directives/loading.directive';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, StatusBadgePipe, LoadingDirective],
  template: `
    <div class="users-container">
      <h1>Users Management</h1>

      <div *appLoading="isLoading()" class="loading">
        <p>Loading users...</p>
      </div>

      @if (!isLoading()) {
        <div class="users-grid">
          @for (user of users(); track user.id) {
            <div class="user-card">
              <img [src]="user.avatar" [alt]="user.name" class="user-avatar">
              <h3>{{ user.name }}</h3>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Phone:</strong> {{ user.phone }}</p>
              <p><strong>Role:</strong> {{ user.role | uppercase }}</p>
              <p><strong>Status:</strong> {{ user.status | statusBadge }}</p>
              <p><strong>Joined:</strong> {{ user.joinDate | date: 'MMM dd, yyyy' }}</p>
              <button (click)="editUser(user)" class="btn-edit">Edit</button>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .users-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    h1 { color: #333; margin-bottom: 30px; }
    .loading {
      text-align: center;
      padding: 40px;
      font-size: 1.1rem;
      color: #667eea;
    }
    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .user-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s;
    }
    .user-card:hover { transform: translateY(-5px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .user-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 15px;
      border: 3px solid #667eea;
    }
    .user-card h3 { margin: 15px 0; color: #333; }
    .user-card p { margin: 8px 0; color: #666; font-size: 0.9rem; }
    .btn-edit {
      background: #667eea;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
      transition: background 0.3s;
    }
    .btn-edit:hover { background: #764ba2; }
  `]
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  users = signal<User[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.notificationService.addNotification('Failed to load users', 'error');
      }
    });
  }

  editUser(user: User) {
    this.router.navigate(['/users/edit', user.id]);
  }
}