import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  protected couponInput = '';
  protected readonly couponError = signal<string>('');

  protected applyCoupon(): void {
    if (!this.couponInput.trim()) {
      this.couponError.set('Please enter a coupon code');
      return;
    }
    const success = this.cartService.applyCoupon(this.couponInput);
    if (!success) {
      this.couponError.set('Invalid coupon code. Try LISA20'); // Updated text
    } else {
      this.couponError.set('');
    }
  }

  protected removeCoupon(): void {
    this.cartService.removeCoupon();
    this.couponInput = '';
    this.couponError.set('');
  }

  protected proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  protected getGradient(category: string): string {
    const gradients: Record<string, string> = {
      'Cakes': 'linear-gradient(135deg, #fdf0e9 0%, #f0c4b6 100%)',
      'Traditional Sweets': 'linear-gradient(135deg, #fae8e0 0%, #d49a89 100%)',
      'Cupcakes': 'linear-gradient(135deg, #fcefee 0%, #c27a7c 100%)',
      'Dessert Jars': 'linear-gradient(135deg, #f5f0ed 0%, #b57b6a 100%)',
    };
    return gradients[category] || 'linear-gradient(135deg, #fdf0e9 0%, #d49a89 100%)';
  }

}
