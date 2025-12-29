import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  
  currentUser = this.userService.currentUser;
  displayName = this.userService.displayName;
  isLoggedIn = this.userService.isLoggedIn;

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}