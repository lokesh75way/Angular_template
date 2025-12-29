import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { LoadingDirective } from '../../directives/loading.directive';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, TruncatePipe, LoadingDirective],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  isAdmin = this.userService.isAdmin;

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log("signal loading false ------")
        this.products.set(products);
        setTimeout(() => {          console.log("signal loading false settimeout------")
          this.isLoading.set(false);
        }, 500);
        // this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.notificationService.addNotification('Failed to load products', 'error');
      }
    });
  }

  addToCart(product: Product) {
    this.notificationService.addNotification(
      `${product.name} added to cart! 🛒`,
      'success'
    );
  }

  editProduct(product: Product) {
    this.router.navigate(['/products/edit', product.id]);
  }
}