import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user' | 'guest';
  avatar: string;
  status: 'active' | 'inactive';
  joinDate: Date;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject approach (RxJS)
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  // Signals approach
  currentUser = signal<User | null>(null);
  userRole = signal<string>('guest');
  isLoggedIn = signal<boolean>(false);
  
  // Computed signals
  isAdmin = computed(() => this.userRole() === 'admin');
  displayName = computed(() => {
    const user = this.currentUser();
    return user ? `${user.name} (${user.role})` : 'Guest User';
  });

  // Mock user data
  private mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0101',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      status: 'active',
      password: 'passwOrd@123',
      joinDate: new Date('2023-01-15')
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1-555-0102',
      role: 'user',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      status: 'active',
      password: 'passwOrd@234',
      joinDate: new Date('2023-06-20')
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1-555-0103',
      role: 'user',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      status: 'inactive',
      password: 'passwOrd@2334',
      joinDate: new Date('2023-03-10')
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      phone: '+1-555-0104',
      role: 'user',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      status: 'active',
      password: 'passwOrd123@234',
      joinDate: new Date('2023-09-05')
    }
  ];

  constructor() {
    this.initializeFromLocalStorage();
  }

  private initializeFromLocalStorage() {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUser.set(user);
        this.userRole.set(user.role);
        this.isLoggedIn.set(true);
        this.userSubject.next(user);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      this.logout();
    }
  }

  private saveUserToLocalStorage(user: User): void {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }

  private clearUserFromLocalStorage(): void {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error clearing user from localStorage:', error);
    }
  }

  getAllUsers(): Observable<User[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockUsers);
        observer.complete();
      }, 500);
    });
  }

  getUserById(id: number): Observable<User | undefined> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockUsers.find(u => u.id === id));
        observer.complete();
      }, 300);
    });
  }

  login(login: LoginCredentials) {
    return new Promise<User | null>((resolve) => {
      setTimeout(() => {
        const index = this.mockUsers.findIndex(u => u.email === login.email);
        let mockUser = this.mockUsers[index];
        if (mockUser && mockUser.password === login.password) {
          this.userSubject.next(mockUser);
          this.currentUser.set(mockUser);
          this.userRole.set(mockUser.role);
          this.isLoggedIn.set(true);
          this.saveUserToLocalStorage(mockUser);
          resolve(mockUser);
        }
        resolve(null);
      }, 800);
    });
  }

  updateUser(user: User): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        const index = this.mockUsers.findIndex(u => u.id === user.id);
        if (index > -1) {
          this.mockUsers[index] = user;
        }
        this.currentUser.set(user);
        observer.next(user);
        observer.complete();
      }, 500);
    });
  }

  logout() {
    this.userSubject.next(null);
    this.currentUser.set(null);
    this.userRole.set('guest');
    this.isLoggedIn.set(false);
    this.clearUserFromLocalStorage();
  }
}