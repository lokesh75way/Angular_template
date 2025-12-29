import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);

  canActivate(): boolean {
    const isLoggedIn = this.userService.isLoggedIn();
    if (isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}