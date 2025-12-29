import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;

  product: Product | null = null;
  isLoading = false;
  isSubmitting = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(parseInt(productId, 10));
    }
  }

  private loadProduct(id: number) {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = { ...product };
        } else {
          this.notificationService.addNotification('Product not found', 'error');
          this.router.navigate(['/products']);
        }
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.addNotification('Failed to load product', 'error');
        this.isLoading = false;
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid && this.product) {
      this.isSubmitting = true;
      this.productService.updateProduct(this.product).subscribe({
        next: () => {
          this.notificationService.addNotification('Product updated successfully', 'success');
          this.router.navigate(['/products']);
          this.isSubmitting = false;
        },
        error: () => {
          this.notificationService.addNotification('Failed to update product', 'error');
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
}
