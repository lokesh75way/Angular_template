import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro',
      category: 'Electronics',
      price: 1299.99,
      stock: 15,
      description: 'High-performance laptop for professionals',
      image: 'https://picsum.photos/id/9/200',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      category: 'Accessories',
      price: 29.99,
      stock: 50,
      description: 'Ergonomic wireless mouse',
      image: 'https://picsum.photos/id/10/200',
      rating: 4.2
    },
    {
      id: 3,
      name: 'USB-C Cable',
      category: 'Cables',
      price: 12.99,
      stock: 100,
      description: '2-meter USB-C charging cable',
      image: 'https://picsum.photos/id/12/200',
      rating: 4.0
    },
    {
      id: 4,
      name: 'Monitor 4K',
      category: 'Electronics',
      price: 499.99,
      stock: 8,
      description: '27-inch 4K Ultra HD Monitor',
      image: 'https://picsum.photos/id/15/200',
      rating: 4.8
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      category: 'Accessories',
      price: 149.99,
      stock: 25,
      description: 'RGB Mechanical Gaming Keyboard',
      image: 'https://picsum.photos/id/75/200',
      rating: 4.6
    }
  ];

  getProducts(): Observable<Product[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockProducts);
        observer.complete();
      }, 600);
    });
  }

  getProductById(id: number): Observable<Product | undefined> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockProducts.find(p => p.id === id));
        observer.complete();
      }, 300);
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return new Observable(observer => {
      setTimeout(() => {
        const index = this.mockProducts.findIndex(p => p.id === product.id);
        if (index > -1) {
          this.mockProducts[index] = product;
        }
        observer.next(product);
        observer.complete();
      }, 500);
    });
  }
}