import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit {
  form!: FormGroup;
  user: User | null = null;
  isLoading = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(parseInt(userId, 10));
    }
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\-\s()]+$/)]],
      role: ['user', Validators.required],
      status: ['active', Validators.required]
    });
  }

  private loadUser(id: number) {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.form.patchValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status
          });
        } else {
          this.notificationService.addNotification('User not found', 'error');
          this.router.navigate(['/users']);
        }
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.addNotification('Failed to load user', 'error');
        this.isLoading = false;
        this.router.navigate(['/users']);
      }
    });
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  onSubmit() {
    if (this.form.valid && this.user) {
      const updatedUser: User = {
        ...this.user,
        ...this.form.value
      };

      this.isLoading = true;
      this.userService.updateUser(updatedUser).subscribe({
        next: () => {
          this.notificationService.addNotification('User updated successfully', 'success');
          this.router.navigate(['/users']);
          this.isLoading = false;
        },
        error: () => {
          this.notificationService.addNotification('Failed to update user', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
