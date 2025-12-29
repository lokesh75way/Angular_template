import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  showPassword = signal<boolean>(false);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  togglePasswordVisibility() {
    this.showPassword.update(val => !val);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Login payload:', this.form.value);
      this.userService.login(this.form.value).then(res => {
        console.log('User logged in:', res);
        if (res) {
          this.router.navigate(['/dashboard']);
        } else {
          this.notificationService.addNotification('Login failed. Please check your credentials.', 'error');
        }
      });
    }
  }
}
