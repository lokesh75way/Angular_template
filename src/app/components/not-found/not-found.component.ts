import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <a routerLink="/dashboard" class="btn-home">Go to Dashboard</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    }
    .not-found-content {
      text-align: center;
    }
    h1 {
      font-size: 120px;
      color: #667eea;
      margin: 0;
    }
    h2 {
      color: #333;
      margin: 10px 0;
    }
    p {
      color: #666;
      font-size: 1.1rem;
    }
    .btn-home {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 12px 30px;
      border-radius: 4px;
      text-decoration: none;
      margin-top: 20px;
      transition: background 0.3s;
    }
    .btn-home:hover { background: #764ba2; }
  `]
})
export class NotFoundComponent { }
