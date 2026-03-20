import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  protected readonly wishlistService = inject(WishlistService);
  protected readonly cartService = inject(CartService);

  protected moveToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.wishlistService.remove(product.id);
  }

  protected moveAllToCart(): void {
    for (const product of this.wishlistService.items()) {
      this.cartService.addToCart(product);
    }
    this.wishlistService.clear();
  }

  protected getDiscount(product: Product): number {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }

  protected getGradient(category: string): string {
    const gradients: Record<string, string> = {
      'Cold-Pressed Oils': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      'Ghee & Dairy': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'Millets': 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
      'Powders': 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      'Sweeteners': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Honey & Natural': 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
    };
    return gradients[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

}
